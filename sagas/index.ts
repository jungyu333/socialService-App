import { all, fork } from "redux-saga/effects";
import postSaga from "./postSaga";
import signUpSaga from "./signUpSaga";
import userSaga from "./userSaga";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga), fork(signUpSaga)]);
}
