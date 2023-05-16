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

const UserProfile: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const { data: profile, isError } = api.profiles.getById.useQuery({ id });

  if (!profile || !profile.name || isError)
    return <ErrorPage statusCode={404} />;

  return (
    <Head>
      <title>{`Next Twitter - ${profile?.name}`}</title>
    </Head>
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
