import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import UserProfile from "../components/UserProfile";
import tw from "tailwind-styled-components";
import PostForm from "../components/PostForm";

const Wrapper = tw.div`
  flex-col
  relative
`;

const Home = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Social Service</title>
      </Head>
      <Layout>
        <Wrapper>
          <UserProfile />
          <PostForm />
          <PostCard />
        </Wrapper>
      </Layout>
    </>
  );
};
export default Home;
