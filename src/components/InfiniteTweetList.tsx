import React from "react";
import LoadingSpinner from "./UI/LoadingSpinner";
import { type RouterOutputs } from "~/utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import TweetCard from "./TweetCard";
import {
  type InfiniteQueryObserverResult,
  type FetchNextPageOptions,
} from "@tanstack/react-query";

type InfiniteTweetsData = RouterOutputs["tweets"]["getAllTweets"];
type Tweets = RouterOutputs["tweets"]["getAllTweets"]["tweets"];

type FetchNextPage = (
  options?: FetchNextPageOptions | undefined
) => Promise<InfiniteQueryObserverResult<InfiniteTweetsData>>;

type Props = {
  isLoading: boolean;
  isError: boolean;
  tweets: Tweets | undefined;
  hasMore?: boolean;
  fetchNextPage: FetchNextPage;
  dataLength: number | undefined;
};

const InfiniteTweetList = ({
  isLoading,
  isError,
  tweets,
  hasMore,
  fetchNextPage,
  dataLength,
}: Props) => {
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <h1>Error...</h1>;

  if (!tweets || tweets.length === 0)
    return (
      <>
        <h1 className="my-4 text-center text-2xl text-gray-500">
          No Tweets at the moment.
        </h1>
        <h2 className="my-2 text-center text-xl text-gray-500">
          Follow Sombody.
        </h2>
      </>
    );

  return (
    <ul>
      <InfiniteScroll
        dataLength={dataLength ?? 0}
        next={fetchNextPage}
        hasMore={hasMore ?? false}
        loader={<LoadingSpinner />}
      >
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} {...tweet} />
        ))}
      </InfiniteScroll>
    </ul>
  );
};

export default InfiniteTweetList;
