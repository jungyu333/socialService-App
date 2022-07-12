import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import wrapper from "../../store/configureStore";
import { GetServerSideProps } from "next";
import axios from "axios";
import { myInfoLoadRequestAction } from "../../action/userAction";
import { END } from "redux-saga";
import { useDispatch } from "react-redux";
import { hashtagLoadRequestAction } from "../../action/postActions";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import PostCard from "../../components/PostCard";

const HashtagHeader = tw.div`
  max-w-sm
  mx-auto
  sm:max-w-md
  text-2xl
  font-bold
  text-indigo-700
  
  
  
`;

function Hashtag() {
  const router = useRouter();
  const { hasMorePosts, postLoadLoading, mainPosts } = useSelector(
    (state: RootState) => state.postReducer
  );
  const { hashtag } = router.query;
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !postLoadLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;

      dispatch(hashtagLoadRequestAction({ lastId: lastId, hashtag: hashtag }));
    }
  }, [inView, mainPosts, hasMorePosts, postLoadLoading]);
  return (
    <Layout>
      <div className="relative mt-10">
        <HashtagHeader>#{hashtag}</HashtagHeader>
        {mainPosts?.map((post) => (
          <PostCard key={post?.id} {...post} />
        ))}
        <div
          className="h-3"
          ref={hasMorePosts && !postLoadLoading ? ref : undefined}
        />
      </div>
    </Layout>
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
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
    };
  });

export default Hashtag;
