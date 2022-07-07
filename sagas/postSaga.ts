import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  addCommentFailureAction,
  addCommentSuccessAction,
  addPostFailureAction,
  addPostSuccessAction,
  postDeleteFailureAction,
  postDeleteSuccessAction,
  postImageUploadFailureAction,
  postImageUploadSuccessAction,
  postLoadFailureAction,
  postLoadSuccessAction,
} from "../action/postActions";
import {
  ADD_COMMENT_REQUEST,
  ADD_POST_REQUEST,
  POST_DELETE_REQUEST,
  POST_IMAGE_UPLOAD_REQUEST,
  POST_LOAD_REQUEST,
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
    console.log(result);
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
  }
}

function postLoadAPI(data) {
  return axios.get(`/posts?lastId=${data || 0}`);
}

function* postLoad(action) {
  try {
    console.log(action.data);
    const result = yield call(postLoadAPI, action.data);
    console.log(result.data);
    yield put(postLoadSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(postLoadFailureAction(err.response.data));
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

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddPostImg),
    fork(watchAddComment),
    fork(watchPostDelete),
    fork(watchPostLoad),
  ]);
}
