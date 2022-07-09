import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  addCommentFailureAction,
  addCommentSuccessAction,
  addLikeFailureAction,
  addLikeSuccessAction,
  addPostFailureAction,
  addPostSuccessAction,
  commentRemoveFailureAction,
  commentRemoveSuccessAction,
  postDeleteFailureAction,
  postDeleteSuccessAction,
  postImageUploadFailureAction,
  postImageUploadSuccessAction,
  postLoadFailureAction,
  postLoadSuccessAction,
  removeLikeFailureAction,
  removeLikeSuccessAction,
} from "../action/postActions";
import {
  ADD_COMMENT_REQUEST,
  ADD_LIKE_REQUEST,
  ADD_POST_REQUEST,
  COMMENT_REMOVE_REQUEST,
  POST_DELETE_REQUEST,
  POST_IMAGE_UPLOAD_REQUEST,
  POST_LOAD_REQUEST,
  REMOVE_LIKE_REQUEST,
} from "../action/types";

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put(addPostSuccessAction(result.data));
  } catch (err) {
    yield put(addPostFailureAction(err.response.data));
  }
}

function postImageAPI(data) {
  return axios.post("/postimg", data);
}

function* addPostImage(action) {
  try {
    const result = yield call(postImageAPI, action.data);

    yield put(postImageUploadSuccessAction(result.data));
  } catch (err) {
    yield put(postImageUploadFailureAction(err.response.data));
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);

    yield put(addCommentSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(addCommentFailureAction(err.response.data));
  }
}

function postDeleteAPI(data) {
  return axios.delete(`/post/${data}`, data);
}

function* postDelete(action) {
  try {
    const result = yield call(postDeleteAPI, action.data);
    yield put(postDeleteSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(postDeleteFailureAction(err.response.data));
    alert(err.response.data);
  }
}

function postLoadAPI(data) {
  return axios.get(`/posts?lastId=${data || 0}`);
}

function* postLoad(action) {
  try {
    const result = yield call(postLoadAPI, action.data);

    yield put(postLoadSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(postLoadFailureAction(err.response.data));
  }
}

function commentRemoveAPI(data) {
  return axios.delete(`/post/${data.postId}/${data.commentId}`);
}

function* commentRemove(action) {
  try {
    const result = yield call(commentRemoveAPI, action.data);

    yield put(commentRemoveSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(commentRemoveFailureAction(err.response.data));
  }
}

function addLikeAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* addLike(action) {
  try {
    const result = yield call(addLikeAPI, action.data);
    console.log(result);
    yield put(addLikeSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(addLikeFailureAction(err.response.data));
  }
}

function removeLikeAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* removeLike(action) {
  try {
    const result = yield call(removeLikeAPI, action.data);

    yield put(removeLikeSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(removeLikeFailureAction(err.response.data));
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddPostImg() {
  yield takeLatest(POST_IMAGE_UPLOAD_REQUEST, addPostImage);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchPostDelete() {
  yield takeLatest(POST_DELETE_REQUEST, postDelete);
}

function* watchPostLoad() {
  yield takeLatest(POST_LOAD_REQUEST, postLoad);
}

function* watchCommentRemove() {
  yield takeLatest(COMMENT_REMOVE_REQUEST, commentRemove);
}

function* watchAddLike() {
  yield takeLatest(ADD_LIKE_REQUEST, addLike);
}

function* watchRemoveLike() {
  yield takeLatest(REMOVE_LIKE_REQUEST, removeLike);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddPostImg),
    fork(watchAddComment),
    fork(watchPostDelete),
    fork(watchPostLoad),
    fork(watchCommentRemove),
    fork(watchAddLike),
    fork(watchRemoveLike),
  ]);
}
