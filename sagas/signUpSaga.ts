import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  SignUpAction,
  signUpFailureAction,
  signUpSuccessAction,
} from "../action/signUpAction";
import { AVATAR_UPLOAD_REQUEST, SIGN_UP_REQUEST } from "../action/types";
import {
  avatarUploadFailureAction,
  avatarUploadSuccessAction,
  UserAction,
} from "../action/userAction";

function signUpAPI(data) {
  return axios.post("/signup", data);
}

function* signUp(action: SignUpAction) {
  try {
    yield call(signUpAPI, action.data);

    yield put(signUpSuccessAction());
  } catch (err) {
    yield put(signUpFailureAction(err.response.data));
    alert(err.response.data);
  }
}

function avatarUploadAPI(data) {
  return axios.post("/avatar", data);
}

function* avatarUpload(action: UserAction) {
  try {
    const result = yield call(avatarUploadAPI, action.data);

    yield put(avatarUploadSuccessAction(result.data));
  } catch (err) {
    yield put(avatarUploadFailureAction(err.response.data));
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
