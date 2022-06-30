import produce from "immer";
import { LogInOutAction } from "../action/logInOutActions";
import {
  LOG_IN_ERROR_INIT,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from "../action/types";

const initialState: LogInState = {
  logInDone: false,
  logInLoading: false,
  logInError: null,
  logOutDone: false,
  logOutLoading: false,
  logOutError: null,
  me: null,
};

export interface LogInState {
  logInDone: boolean;
  logInLoading: boolean;
  logInError: string;
  logOutDone: boolean;
  logOutLoading: boolean;
  logOutError: string;

  me: {
    id: number;
    nickname: string;
    email: string;
    Posts: {}[];
    Followers: {}[];
    Followings: {}[];
  };
}

const userReducer = (state = initialState, action: LogInOutAction) =>
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
      default:
        break;
    }
  });

export default userReducer;
