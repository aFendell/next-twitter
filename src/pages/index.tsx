import { type NextPage } from "next";
import Header from "~/components/Header";
import Feed from "~/components/Feed";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Feed />
    </>
  );
};

export default Home;
