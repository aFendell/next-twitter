import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "~/utils/api";
import TweetCard from "./TweetCard";
import LoadingSpinner from "./UI/LoadingSpinner";

const FollowingTweets = () => {
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    api.tweets.getAll.useInfiniteQuery(
      { isFollowing: true },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <h1>Error...</h1>;

  const tweets = data.pages.flatMap((page) => page.tweets);
  if (!data || tweets.length === 0)
    return (
      <>
        <h1 className="my-4 text-center text-2xl text-gray-500">No Tweets.</h1>
        <h2 className="my-2 text-center text-xl text-gray-500">
          Follow Sombody.
        </h2>
      </>
    );

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={<LoadingSpinner />}
      >
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} {...tweet} />
        ))}
      </InfiniteScroll>
    </ul>
  );
};

export default FollowingTweets;
