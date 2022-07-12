import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  avatarEditFailureAction,
  avatarEditSuccessAction,
  editInfoFailureAction,
  editInfoSuccessAction,
} from "../action/userAction";
import { AVATAR_EDIT_REQUEST, EDIT_INFO_REQUEST } from "../action/types";

function editInfoAPI(data) {
  return axios.post("/editinfo", data);
}

function* editInfo(action) {
  try {
    const result = yield call(editInfoAPI, action.data);

    yield put(editInfoSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(editInfoFailureAction(err.response.data));
  }
}

function avatarEditAPI(data) {
  return axios.post("/editavatar", data);
}

function* avatarEdit(action) {
  try {
    const result = yield call(avatarEditAPI, action.data);

    yield put(avatarEditSuccessAction(result.data));
  } catch (err) {
    console.error(err);
    yield put(avatarEditFailureAction(err.response.data));
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
