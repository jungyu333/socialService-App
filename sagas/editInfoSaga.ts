import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { UserAction } from "../action/userAction";
import {
  AVATAR_EDIT_FAILURE,
  AVATAR_EDIT_REQUEST,
  AVATAR_EDIT_SUCCESS,
  EDIT_INFO_FAILURE,
  EDIT_INFO_REQUEST,
  EDIT_INFO_SUCCESS,
} from "../action/types";

function editInfoAPI(data) {
  return axios.post("/editinfo", data);
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
      type: EDIT_INFO_FAILURE,
      data: err.response.data,
    });
  }
}

function avatarEditAPI(data) {
  return axios.post("/editavatar", data);
}

function* avatarEdit(action: UserAction) {
  try {
    const result = yield call(avatarEditAPI, action.data);

    yield put({
      type: AVATAR_EDIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: AVATAR_EDIT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchEditInfo() {
  yield takeLatest(EDIT_INFO_REQUEST, editInfo);
}

function* watchAvatarEdit() {
  yield takeLatest(AVATAR_EDIT_REQUEST, avatarEdit);
}

export default function* editInfoSaga() {
  yield all([fork(watchEditInfo), fork(watchAvatarEdit)]);
}
