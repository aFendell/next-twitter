import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout/layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Next - Twitter</title>
        <meta name="Next Twitter" content="A Next JS Twitter Clone" />
        <meta
          name="google-site-verification"
          content="cC1EvU0d3X703Y3gIi6H-O8R4yCJP0dx3eTVib5tCt4"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
