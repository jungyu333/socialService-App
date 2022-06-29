import { all, fork } from "redux-saga/effects";
import postSaga from "./postSaga";
import signUpSaga from "./signUpSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga), fork(signUpSaga)]);
}
