import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  logInFailureAction,
  logInSuccessAction,
  logOutFailureAction,
  logOutSuccessAction,
  UserAction,
  myInfoLoadFailureAction,
  myInfoLoadSuccessAction,
  userLoadFailureAction,
  userLoadSuccessAction,
  userFollowFailureAction,
  userFollowSuccessAction,
  userUnFollowFailureAction,
  userUnFollowSuccessAction,
} from "../action/userAction";

import {
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  MY_INFO_LOAD_REQUEST,
  USER_FOLLOW_REQUEST,
  USER_LOAD_REQUEST,
  USER_POST_LOAD_REQUEST,
  USER_UNFOLLOW_REQUEST,
} from "../action/types";

function logInAPI(data) {
  return axios.post("/login", data);
}

function* logIn(action) {
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

function myInfoLoadAPI() {
  return axios.get("/user");
}

function* myInfoLoad() {
  try {
    const result = yield call(myInfoLoadAPI);
    yield put(myInfoLoadSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(myInfoLoadFailureAction(err.response?.data));
  }
}

function userLoadAPI(data) {
  return axios.get(`/user/${data}`);
}

function* userLoad(action) {
  try {
    const result = yield call(userLoadAPI, action.data);
    yield put(userLoadSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(userLoadFailureAction(err.response.data));
  }
}

function followAPI(data) {
  return axios.post(`/user/${data}/follow`);
}

function* userFollow(action) {
  try {
    const result = yield call(followAPI, action.data);

    yield put(userFollowSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(userFollowFailureAction(err.response.data));
    alert(err.response.data);
  }
}

function unFollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* userUnFollow(action) {
  try {
    const result = yield call(unFollowAPI, action.data);

    yield put(userUnFollowSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(userUnFollowFailureAction(err.response?.data));
    alert(err.response.data);
  }
}

function* watchUserLoad() {
  yield takeLatest(USER_LOAD_REQUEST, userLoad);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchMyInfoLoad() {
  yield takeLatest(MY_INFO_LOAD_REQUEST, myInfoLoad);
}

function* watchFollow() {
  yield takeLatest(USER_FOLLOW_REQUEST, userFollow);
}

function* watchUnFollow() {
  yield takeLatest(USER_UNFOLLOW_REQUEST, userUnFollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchMyInfoLoad),
    fork(watchUserLoad),
    fork(watchFollow),
    fork(watchUnFollow),
  ]);
}
