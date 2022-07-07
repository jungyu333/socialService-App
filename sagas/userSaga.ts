import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  UserAction,
  userInfoLoadFailureAction,
  userInfoLoadSuccessAction,
} from "../action/userAction";

import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  USER_INFO_LOAD_REQUEST,
} from "../action/types";

function logInAPI(data) {
  return axios.post("/login", data);
}

function* logIn(action: UserAction) {
  try {
    const result = yield call(logInAPI, action.data);

    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/logout");
}

function* logOut() {
  try {
    yield call(logOutAPI);

    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      data: err.response.data,
    });
  }
}

function userLoadAPI() {
  return axios("/userload");
}

function* userLoad() {
  try {
    const result = yield call(userLoadAPI);
    yield put(userInfoLoadSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(userInfoLoadFailureAction(err.response.data));
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchUserLoad() {
  yield takeLatest(USER_INFO_LOAD_REQUEST, userLoad);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchUserLoad)]);
}
