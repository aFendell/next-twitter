import { api } from "~/utils/api";
import InfiniteTweetList from "./InfiniteTweetList";

const RecentTweets = () => {
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    api.tweets.getAllTweets.useInfiniteQuery(
      {},
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const tweets = data?.pages.flatMap((page) => page.tweets);

  return (
    <InfiniteTweetList
      tweets={tweets}
      dataLength={tweets?.length}
      fetchNextPage={fetchNextPage}
      hasMore={hasNextPage}
      isError={isError}
      isLoading={isLoading}
    />
  );
};

export default RecentTweets;
