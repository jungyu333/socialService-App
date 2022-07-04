import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  postImageUploadFailureAction,
  postImageUploadSuccessAction,
} from "../action/postActions";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  POST_IMAGE_UPLOAD_REQUEST,
} from "../action/types";

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
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
