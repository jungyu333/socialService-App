import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { SignUpAction } from "../action/signUpAction";
import {
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../action/types";

function signUpAPI(data) {
  return axios.post("http://localhost:4000/signup", data);
}

function* signUp(action: SignUpAction) {
  try {
    const result = yield call(signUpAPI, action.data);

    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* signUpSaga() {
  yield all([fork(watchSignUp)]);
}
