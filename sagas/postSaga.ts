import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  addPostFailureAction,
  addPostSuccessAction,
  postImageUploadFailureAction,
  postImageUploadSuccessAction,
} from "../action/postActions";
import { ADD_POST_REQUEST, POST_IMAGE_UPLOAD_REQUEST } from "../action/types";

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    console.log(result);
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
    console.log(result);
    yield put(postImageUploadSuccessAction(result.data));
  } catch (err) {
    yield put(postImageUploadFailureAction(err.response.data));
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddPostImg() {
  yield takeLatest(POST_IMAGE_UPLOAD_REQUEST, addPostImage);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddPostImg)]);
}
