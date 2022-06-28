import { LogInOutActionType } from "../action/logInOutActions";
import {
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
  logOutDone: false,
  logOutLoading: false,
  user: null,
};

export interface LogInState {
  logInDone: boolean;
  logInLoading: boolean;

  logOutDone: boolean;
  logOutLoading: boolean;

  user: {
    id: number;
    email: string;
    password: string;
  };
}

const dummyUser = (data) => ({
  ...data,
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

const userReducer = (state = initialState, aciton: LogInOutActionType) => {
  switch (aciton.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        logOutDone: false,
        user: dummyUser(aciton.data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        logInDone: false,
        user: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
