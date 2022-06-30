import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import UserProfile from "../components/UserProfile";
import tw from "tailwind-styled-components";
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const Wrapper = tw.div`
  flex-col
  relative
`;

const Home = () => {
  const { me } = useSelector((state: RootState) => state.userReducer);
  const { mainPosts } = useSelector((state: RootState) => state.postReducer);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Social Service</title>
      </Head>
      <Layout>
        <Wrapper>
          {me ? <UserProfile /> : null}
          <PostForm />
          {mainPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </Wrapper>
      </Layout>
    </>
  );
};
export default Home;
