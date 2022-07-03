import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { SignUpAction } from "../action/signUpAction";
import {
  AVATAR_UPLOAD_FAILURE,
  AVATAR_UPLOAD_REQUEST,
  AVATAR_UPLOAD_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../action/types";
import { UserAction } from "../action/userAction";

function signUpAPI(data) {
  return axios.post("/signup", data);
}

function* signUp(action: SignUpAction) {
  try {
    const result = yield call(signUpAPI, action.data);

    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      data: err.response.data,
    });
  }
}

function avatarUploadAPI(data) {
  return axios.post("/avatar", data);
}

function* avatarUpload(action: UserAction) {
  try {
    const result = yield call(avatarUploadAPI, action.data);

    yield put({
      type: AVATAR_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: AVATAR_UPLOAD_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchUploadAvatar() {
  yield takeLatest(AVATAR_UPLOAD_REQUEST, avatarUpload);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* signUpSaga() {
  yield all([fork(watchSignUp), fork(watchUploadAvatar)]);
}
