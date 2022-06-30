import { all, fork } from "redux-saga/effects";
import postSaga from "./postSaga";
import signUpSaga from "./signUpSaga";
import userSaga from "./userSaga";
import axios from "axios";
import editInfoSaga from "./editInfoSaga";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
    fork(signUpSaga),
    fork(editInfoSaga),
  ]);
}
