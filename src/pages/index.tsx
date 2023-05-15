import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import FollowingTweets from "~/components/FollowingTweets";
import Header from "~/components/Header";
import NewTweetForm from "~/components/NewTweetForm";
import RecentTweets from "~/components/RecentTweets";
import Tabs, { type Tab } from "~/components/UI/Tabs";

const tabs: Tab[] = [
  {
    id: 0,
    label: "Recent",
  },
  {
    id: 1,
    label: "Following",
  },
];

const Home: NextPage = () => {
  const session = useSession();

  const [selectedTab, setSelectedTab] = useState<Tab["id"]>(0);

  return (
    <>
      <Header>
        {session.status === "authenticated" && (
          <>
            <Tabs
              selectedTab={selectedTab}
              tabs={tabs}
              onChange={setSelectedTab}
            />
            <NewTweetForm profileImageSrc={session.data.user?.image} />
          </>
        )}
      </Header>
      {selectedTab === 0 ? <RecentTweets /> : <FollowingTweets />}
    </>
  );
};

export default Home;
