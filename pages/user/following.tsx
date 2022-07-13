import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { END } from "redux-saga";
import {
  followingLoadRequestAcion,
  myInfoLoadRequestAction,
} from "../../action/userAction";
import Layout from "../../components/Layout";
import wrapper from "../../store/configureStore";
import tw from "tailwind-styled-components";
import FollowCard from "../../components/FollowCard";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useInView } from "react-intersection-observer";

const Wrapper = tw.div`
  max-w-sm
  mx-auto
  sm:max-w-md
 
  
  flex-col
  justify-center
  mt-4
  mb-2
`;

function following() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { FollowersList, me, hasMoreFollow, followingLoadLoading } =
    useSelector((state: RootState) => state.userReducer);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!me) {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    if (inView && hasMoreFollow && !followingLoadLoading) {
      const lastId = FollowersList[FollowersList.length - 1]?.id;
      dispatch(followingLoadRequestAcion(lastId));
    }
  }, [inView, hasMoreFollow, followingLoadLoading, FollowersList]);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>팔로잉 | Social Service</title>
      </Head>
      <Layout>
        <Wrapper>
          {FollowersList.map((following) => (
            <FollowCard key={following.id} {...following} />
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
    store.dispatch(followingLoadRequestAcion(0));
    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {},
    };
  });

export default following;
