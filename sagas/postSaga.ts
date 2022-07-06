import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  addCommentFailureAction,
  addCommentSuccessAction,
  addPostFailureAction,
  addPostSuccessAction,
  postImageUploadFailureAction,
  postImageUploadSuccessAction,
} from "../action/postActions";
import {
  ADD_COMMENT_REQUEST,
  ADD_POST_REQUEST,
  POST_IMAGE_UPLOAD_REQUEST,
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

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddPostImg() {
  yield takeLatest(POST_IMAGE_UPLOAD_REQUEST, addPostImage);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddPostImg), fork(watchAddComment)]);
}
