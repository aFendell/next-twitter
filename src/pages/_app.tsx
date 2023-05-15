import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import SideNav from "~/components/SideNav";

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
      <div className="container mx-auto flex items-start sm:pr-4">
        <SideNav />
        <main className="min-h-screen flex-grow border-x">
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
