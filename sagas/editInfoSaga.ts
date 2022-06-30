import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { UserAction } from "../action/userAction";
import {
  EDIT_INFO_FAILUER,
  EDIT_INFO_REQUEST,
  EDIT_INFO_SUCCESS,
} from "../action/types";

function editInfoAPI(data) {
  return axios.patch("/editinfo", data);
}

function* editInfo(action: UserAction) {
  try {
    const result = yield call(editInfoAPI, action.data);
    console.log(result);
    yield put({
      type: EDIT_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_INFO_FAILUER,
      data: err.response.data,
    });
  }
}

function* watchEditInfo() {
  yield takeLatest(EDIT_INFO_REQUEST, editInfo);
}

export default function* editInfoSaga() {
  yield all([fork(watchEditInfo)]);
}
