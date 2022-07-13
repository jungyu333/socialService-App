import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import MyProfile from "../components/MyProfile";
import tw from "tailwind-styled-components";
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { END } from "redux-saga";
import { useDispatch } from "react-redux";
import { myInfoLoadRequestAction } from "../action/userAction";
import { useInView } from "react-intersection-observer";
import { postLoadRequestAction } from "../action/postActions";
import wrapper from "../store/configureStore";
import axios from "axios";
import { GetServerSideProps } from "next";

const Wrapper = tw.div`
  flex-col
  relative
`;

const Home = () => {
  const [ref, inView] = useInView();

  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.userReducer);
  const {
    postDeleteDone,
    addPostDone,
    mainPosts,
    postLoadLoading,
    hasMorePosts,
  } = useSelector((state: RootState) => state.postReducer);

  useEffect(() => {
    if (inView && hasMorePosts && !postLoadLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;

      dispatch(postLoadRequestAction(lastId));
    }
  }, [inView, mainPosts, hasMorePosts, postLoadLoading]);

  useEffect(() => {
    if (addPostDone) {
      dispatch(myInfoLoadRequestAction());
    }
    if (postDeleteDone) {
      dispatch(myInfoLoadRequestAction());
    }
  }, [addPostDone, postDeleteDone]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Social Service</title>
      </Head>
      <Layout>
        <Wrapper>
          {me ? <MyProfile /> : null}
          {me && <PostForm />}
          {mainPosts?.map((post) => (
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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.common.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.common.Cookie = cookie;
    }

    store.dispatch(myInfoLoadRequestAction());
    store.dispatch(postLoadRequestAction(0));

    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
    };
  });

export default Home;
