import { api } from "~/utils/api";
import InfiniteTweetList from "./InfiniteTweetList";

const FollowingTweets = () => {
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    api.tweets.getAllTweets.useInfiniteQuery(
      { isFollowing: true },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const tweets = data?.pages.flatMap((page) => page.tweets);

  return (
    <InfiniteTweetList
      isError={isError}
      isLoading={isLoading}
      tweets={tweets}
      dataLength={tweets?.length}
      hasMore={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default FollowingTweets;
