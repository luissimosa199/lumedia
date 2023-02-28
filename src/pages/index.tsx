import { type NextPage } from "next";
import Head from "next/head";
import Hero from "~/components/hero/hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>lumedia</title>
        <meta name="description" content="lumedia homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
    </>
  );
};

export default Home;
