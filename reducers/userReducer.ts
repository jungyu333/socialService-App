import produce from "immer";
import { UserAction } from "../action/userAction";
import {
  EDIT_INFO_FAILUER,
  EDIT_INFO_REQUEST,
  EDIT_INFO_SUCCESS,
  LOG_IN_ERROR_INIT,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from "../action/types";

const initialState: UserState = {
  logInDone: false,
  logInLoading: false,
  logInError: null,
  logOutDone: false,
  logOutLoading: false,
  logOutError: null,
  editLoading: false,
  editDone: false,
  editError: null,
  me: null,
};

export interface UserState {
  logInDone: boolean;
  logInLoading: boolean;
  logInError: string;
  logOutDone: boolean;
  logOutLoading: boolean;
  logOutError: string;
  editLoading: boolean;
  editDone: boolean;
  editError: string;

  me: {
    id: number;
    nickname: string;
    email: string;
    Posts: {}[];
    Followers: {}[];
    Followings: {}[];
  };
}

const userReducer = (state = initialState, action: UserAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.logInError = null;
        draft.logOutDone = false;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInDone = false;
        draft.logInLoading = false;
        draft.logInError = action.data;
        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;

      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logOutError = null;
        draft.logInDone = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutDone = false;
        draft.logOutError = action.data;
        break;
      case LOG_IN_ERROR_INIT:
        draft.logInError = null;
        break;
      case EDIT_INFO_REQUEST:
        draft.editLoading = true;
        draft.editDone = false;
        draft.editError = null;
        break;
      case EDIT_INFO_SUCCESS:
        draft.editLoading = false;
        draft.editDone = true;
        draft.editError = null;
        draft.me.nickname = action.data.nickname;
        break;
      case EDIT_INFO_FAILUER:
        draft.editLoading = false;
        draft.editDone = false;
        draft.editError = action.data;
        break;
      default:
        break;
    }
  });

export default userReducer;
