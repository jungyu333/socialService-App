import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  userInfoLoadRequestAction,
  userPostLoadRequestAcion,
} from "../../action/userAction";
import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import { RootState } from "../../reducers";

function userpost() {
  const [ref, inView] = useInView();
  const { me } = useSelector((state: RootState) => state.userReducer);
  const { userMainPosts, hasMoreUserPosts, userPostLoadLoading } = useSelector(
    (state: RootState) => state.userReducer
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userInfoLoadRequestAction());
  }, []);

  useEffect(() => {
    if (inView && hasMoreUserPosts && !userPostLoadLoading) {
      const lastId = userMainPosts[userMainPosts.length - 1]?.id;
      dispatch(userPostLoadRequestAcion({ lastId: lastId }));
    }
  }, [inView, userMainPosts, hasMoreUserPosts, userPostLoadLoading, me]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>내 게시물| Social Service</title>
      </Head>
      <Layout>
        {userMainPosts?.map((post) => (
          <PostCard key={post?.id} {...post} />
        ))}
        <div
          className="h-3"
          ref={hasMoreUserPosts && !userPostLoadLoading ? ref : undefined}
        />
      </Layout>
    </>
  );
}

export default userpost;
