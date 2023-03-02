import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import MainLayout from "~/components/layout/main-layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <Head>
          <title>lumedia</title>
          <meta name="description" content="lumedia homepage" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
