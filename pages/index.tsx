import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import UserProfile from "../components/UserProfile";
import tw from "tailwind-styled-components";
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

import { useDispatch } from "react-redux";
import { userInfoLoadRequestAction } from "../action/userAction";
import { useInView } from "react-intersection-observer";
import { postLoadRequestAction } from "../action/postActions";

const Wrapper = tw.div`
  flex-col
  relative
`;

const Home = () => {
  const [ref, inView] = useInView();

  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.userReducer);
  const { mainPosts, postLoadLoading, hasMorePosts } = useSelector(
    (state: RootState) => state.postReducer
  );

  useEffect(() => {
    if (inView && hasMorePosts && !postLoadLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      console.log(lastId);
      dispatch(postLoadRequestAction(lastId));
    }
  }, [inView, mainPosts, hasMorePosts, postLoadLoading]);

  useEffect(() => {
    dispatch(userInfoLoadRequestAction());
  }, []);

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
            <PostCard key={post?.id} {...post} />
          ))}
          <div
            className="h-3"
            ref={hasMorePosts && !postLoadLoading ? ref : undefined}
          />
        </Wrapper>
      </Layout>
    </>
  );
};
export default Home;
