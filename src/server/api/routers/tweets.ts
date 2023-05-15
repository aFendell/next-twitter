import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const tweetsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { limit = 10, cursor }, ctx }) => {
      const currentUserId = ctx.session?.user.id;

      const data = await ctx.prisma.tweet.findMany({
        take: limit + 1,
        cursor: cursor ? { createdAt_id: cursor } : undefined,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: {
          id: true,
          content: true,
          createdAt: true,
          _count: { select: { likes: true } },
          likes: !currentUserId ? false : { where: { userId: currentUserId } },
          user: {
            select: { name: true, id: true, image: true },
          },
        },
      });

      let nextCursor: typeof cursor | undefined;
      if (data.length > limit) {
        const nextItem = data.pop();
        if (!!nextItem) {
          nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
        }
      }

      const tweets = data.map((tweet) => ({
        id: tweet.id,
        content: tweet.content,
        createdAt: tweet.createdAt,
        likeCount: tweet._count.likes,
        user: tweet.user,
        likedByme: tweet.likes?.length > 0,
      }));

      return { tweets, nextCursor };
    }),

  create: protectedProcedure
    .input(
      z.object({
        content: z
          .string()
          .min(1, "Min twitt length must be 1 char.")
          .max(280, "Max twitt length must be 280 chars."),
      })
    )
    .mutation(async ({ input: { content }, ctx }) => {
      const newTweet = await ctx.prisma.tweet.create({
        data: {
          content,
          userId: ctx.session.user.id,
        },
      });

      return newTweet;
    }),

  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const data = { userId: ctx.session.user.id, tweetId: id };

      const currentLike = await ctx.prisma.like.findUnique({
        where: { userId_tweetId: data },
      });

      if (!currentLike) {
        await ctx.prisma.like.create({ data });
        return { addedLike: true };
      } else {
        await ctx.prisma.like.delete({ where: { userId_tweetId: data } });
        return { addedLike: false };
      }
    }),
});
