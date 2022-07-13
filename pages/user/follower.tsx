import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import {
  followerLoadRequestAction,
  myInfoLoadRequestAction,
} from "../../action/userAction";
import Layout from "../../components/Layout";
import { RootState } from "../../reducers";
import wrapper from "../../store/configureStore";
import tw from "tailwind-styled-components";
import Head from "next/head";
import FollowCard from "../../components/FollowCard";

const Wrapper = tw.div`
  max-w-sm
  mx-auto
  sm:max-w-md
  flex-col
  justify-center
  mt-4
  mb-2
`;

function follower() {
  const { ref, inView } = useInView();
  const dispatch = useDispatch();
  const { hasMoreFollow, followingLoadLoading, FollowersList } = useSelector(
    (state: RootState) => state.userReducer
  );
  useEffect(() => {
    if (inView && hasMoreFollow && !followingLoadLoading) {
      const lastId = FollowersList[FollowersList.length - 1]?.id;
      dispatch(followerLoadRequestAction(lastId));
    }
  }, [inView, hasMoreFollow, followingLoadLoading, FollowersList]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>팔로워 | Social Service</title>
      </Head>
      <Layout>
        <Wrapper>
          {FollowersList.map((following) => (
            <FollowCard key={following.id} {...following} isFollowing={false} />
          ))}
          <div
            className="h-10"
            ref={hasMoreFollow && !followingLoadLoading ? ref : undefined}
          />
        </Wrapper>
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

    store.dispatch(myInfoLoadRequestAction());
    store.dispatch(followerLoadRequestAction(0));
    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {},
    };
  });

export default follower;
