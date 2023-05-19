import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import FollowingTweets from "~/components/FollowingTweets";
import NewTweetForm from "~/components/NewTweetForm";
import RecentTweets from "~/components/RecentTweets";
import Tabs from "~/components/UI/Tabs";

const tabs = [
  {
    value: "Recent",
  },
  {
    value: "Following",
  },
] as const;

const Home: NextPage = () => {
  const session = useSession();

  const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>(
    tabs[0]
  );

  return (
    <>
      {session.status === "authenticated" && (
        <>
          <Tabs
            selectedTab={selectedTab}
            tabs={tabs}
            onSelect={setSelectedTab}
          />
          <NewTweetForm profileImageSrc={session.data.user?.image} />
        </>
      )}
      {selectedTab.value === "Recent" ? <RecentTweets /> : <FollowingTweets />}
    </>
  );
};

export default Home;
