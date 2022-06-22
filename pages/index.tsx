import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Social Service</title>
      </Head>
      <Layout>
        <div>Hello, Next!</div>
      </Layout>
    </>
  );
};
export default Home;
