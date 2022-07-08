import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  logInFailureAction,
  logInSuccessAction,
  logOutFailureAction,
  logOutSuccessAction,
  UserAction,
  userInfoLoadFailureAction,
  userInfoLoadSuccessAction,
} from "../action/userAction";

import {
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  USER_INFO_LOAD_REQUEST,
} from "../action/types";

function logInAPI(data) {
  return axios.post("/login", data);
}

function* logIn(action: UserAction) {
  try {
    const result = yield call(logInAPI, action.data);

    yield put(logInSuccessAction(result.data));
  } catch (err) {
    yield put(logInFailureAction(err.response.data));
    alert(err.response.data);
  }
}

function logOutAPI() {
  return axios.post("/logout");
}

function* logOut() {
  try {
    yield call(logOutAPI);

    yield put(logOutSuccessAction());
  } catch (err) {
    console.error(err);
    yield put(logOutFailureAction(err.response.data));
  }
}

function userLoadAPI() {
  return axios.get("/userload");
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
