import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "~/utils/api";
import TweetCard from "./TweetCard";

const Feed = () => {
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    api.tweets.getAll.useInfiniteQuery(
      {},
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  const tweets = data.pages.flatMap((page) => page.tweets);
  if (!data || tweets.length === 0)
    return (
      <h1 className="my- text-center text-2xl text-gray-500">No Tweets</h1>
    );

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNextPage}
        hasMore={hasNextPage ? hasNextPage : false}
        loader={"Loading..."}
      >
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} {...tweet} />
        ))}
      </InfiniteScroll>
    </ul>
  );
};

export default Feed;
