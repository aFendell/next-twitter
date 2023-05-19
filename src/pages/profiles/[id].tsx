import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import ErrorPage from "next/error";
import ssgHelper from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
import { getPlural } from "~/utils/strings";
import ProfileImage from "~/components/ProfileImage";
import FollowButton from "~/components/FollowButton";
import InfiniteTweetList from "~/components/InfiniteTweetList";

const UserProfile: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const { data: profile, isError: isProfileError } =
    api.profiles.getById.useQuery({ id });

  const {
    data,
    isError: isTweetsError,
    isLoading: isTweetsLoading,
    hasNextPage,
    fetchNextPage,
  } = api.tweets.getProfileTweets.useInfiniteQuery(
    { userId: id },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const tweets = data?.pages.flatMap((page) => page.tweets);

  if (!profile || !profile.name || isProfileError)
    return <ErrorPage statusCode={404} />;

  const {
    name,
    image,
    tweetsCount,
    followersCount,
    followsCount,
    isFollowing,
  } = profile;
  return (
    <>
      <Head>
        <title>{`Next Twitter - ${name}`}</title>
      </Head>
      <div className="">
        <div className="flex items-end justify-between px-4 py-3">
          <ProfileImage size="lg" src={image} className="flex-shrink-0" />
          <FollowButton isFollowing={isFollowing} userId={id} />
        </div>
        <div className="px-4">
          <h1 className="text-lg font-bold">{name}</h1>
          <div className="flex gap-2 text-gray-500">
            <div>
              <span className="mr-1 font-bold">{tweetsCount}</span>
              {getPlural(tweetsCount, "Tweet", "Tweets")}
            </div>
            <div>
              <span className="mr-1 font-bold">{followersCount}</span>
              {getPlural(followersCount, "Follower", "Followers")}
            </div>
            <div>
              <span className="mr-1 font-bold">{followsCount}</span>
              Following
            </div>
          </div>
        </div>
        <InfiniteTweetList
          isError={isTweetsError}
          isLoading={isTweetsLoading}
          tweets={tweets}
          dataLength={tweets?.length}
          hasMore={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </>
  );
};

export default UserProfile;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

type Params = {
  id: string;
};

export const getStaticProps = async (
  context: GetStaticPropsContext<Params>
) => {
  const id = context.params?.id;

  if (!id)
    return {
      redirect: {
        destination: "/",
      },
    };

  const ssg = ssgHelper();
  await ssg.profiles.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};
