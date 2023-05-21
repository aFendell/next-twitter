import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const profilesRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const currentUserId = ctx.session?.user.id;
      const profile = await ctx.prisma.user.findUnique({
        where: { id },
        select: {
          name: true,
          image: true,
          _count: { select: { followers: true, follows: true, tweets: true } },
          followers: !currentUserId
            ? undefined
            : { where: { id: currentUserId } },
        },
      });

      if (!profile) return;

      return {
        name: profile.name,
        image: profile.image,
        followersCount: profile._count.followers,
        followsCount: profile._count.follows,
        tweetsCount: profile._count.tweets,
        isFollowing: profile.followers.length > 0,
      };
    }),

  toggleFollow: protectedProcedure
    .input(z.object({ profileId: z.string() }))
    .mutation(async ({ input: { profileId }, ctx }) => {
      const currentUserId = ctx.session.user.id;

      const existingFollow = await ctx.prisma.user.findFirst({
        where: { id: profileId, followers: { some: { id: currentUserId } } },
      });

      if (!existingFollow) {
        await ctx.prisma.user.update({
          where: { id: profileId },
          data: { followers: { connect: { id: currentUserId } } },
        });
        return { addedFollow: true };
      } else {
        await ctx.prisma.user.update({
          where: { id: profileId },
          data: { followers: { disconnect: { id: currentUserId } } },
        });
        return { addedFollow: false };
      }
    }),
});
