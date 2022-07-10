import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { END } from "redux-saga";
import { userPostLoadRequestAcion } from "../../action/postActions";
import { userInfoLoadRequestAction } from "../../action/userAction";

import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import { RootState } from "../../reducers";
import wrapper from "../../store/configureStore";

function User() {
  const [ref, inView] = useInView();
  const { me } = useSelector((state: RootState) => state.userReducer);
  const { mainPosts, hasMorePosts, postLoadLoading } = useSelector(
    (state: RootState) => state.postReducer
  );
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    if (inView && hasMorePosts && !postLoadLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(userPostLoadRequestAcion({ lastId: lastId, userId: id }));
    }
  }, [inView, mainPosts, hasMorePosts, postLoadLoading, id]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>내 게시물| Social Service</title>
      </Head>
      <Layout>
        {mainPosts?.map((post) => (
          <PostCard key={post?.id} {...post} />
        ))}
        <div
          className="h-3"
          ref={hasMorePosts && !postLoadLoading ? ref : undefined}
        />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.common.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.common.Cookie = cookie;
    }
    store.dispatch(
      userPostLoadRequestAcion({ lastId: 0, userId: context.params.id })
    );
    store.dispatch(userInfoLoadRequestAction());
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
    };
  });

export default User;
