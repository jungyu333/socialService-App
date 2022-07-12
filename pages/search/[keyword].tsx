import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { END } from "redux-saga";
import { searchLoadRequestAction } from "../../action/postActions";
import { myInfoLoadRequestAction } from "../../action/userAction";
import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import { RootState } from "../../reducers";
import wrapper from "../../store/configureStore";
import { Header } from "../hashtag/[hashtag]";

function Search() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mainPosts, postLoadLoading, hasMorePosts } = useSelector(
    (state: RootState) => state.postReducer
  );
  const { keyword } = router.query;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !postLoadLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;

      dispatch(searchLoadRequestAction({ lastId: lastId, keyword: keyword }));
    }
  }, [inView, hasMorePosts, postLoadLoading, mainPosts, keyword]);

  return (
    <Layout>
      <div className="relative mt-10">
        <Header>'{keyword}' 검색 결과</Header>
        {mainPosts?.map((post) => (
          <PostCard key={post?.id} {...post} />
        ))}
        <div
          className="h-10"
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

export default Search;
