import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import UserProfile from "../components/UserProfile";
import tw from "tailwind-styled-components";
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { userInfoLoadAction } from "../action/userAction";

const Wrapper = tw.div`
  flex-col
  relative
`;

const Home = () => {
  const dispatch = useDispatch();
  const { me, logInDone } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { mainPosts } = useSelector((state: RootState) => state.postReducer);
  const { data, error } = useSWR("/userload");

  useEffect(() => {
    if (!error) {
      dispatch(userInfoLoadAction(data));
    }
  }, [data]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Social Service</title>
      </Head>
      <Layout>
        <Wrapper>
          {me ? <UserProfile /> : null}
          {me ? <PostForm /> : null}
          {mainPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </Wrapper>
      </Layout>
    </>
  );
};
export default Home;
