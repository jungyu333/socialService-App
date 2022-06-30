import {
  LOG_IN_ERROR_INIT,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from "./types";

export const logInRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logInSuccessAction = (data: LogInData) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};

export const logInFailureAction = (data: string) => {
  return {
    type: LOG_IN_FAILURE,
    data,
  };
};

export const logOutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
    data: null,
  };
};

export const logOutSuccessAction = () => {
  return {
    type: LOG_OUT_SUCCESS,
    data: null,
  };
};

export const logOutFailureAction = (data: string) => {
  return {
    type: LOG_OUT_FAILURE,
    data,
  };
};

export const logInErrorInitAction = () => {
  return {
    type: LOG_IN_ERROR_INIT,
    data: null,
  };
};

export interface LogInData {
  id: number;
  nickname: string;
  email: string;
  Posts: {}[];
  Followers: {}[];
  Followings: {}[];
}

export type LogInOutAction =
  | ReturnType<typeof logInRequestAction>
  | ReturnType<typeof logOutRequestAction>
  | ReturnType<typeof logInSuccessAction>
  | ReturnType<typeof logInFailureAction>
  | ReturnType<typeof logOutSuccessAction>
  | ReturnType<typeof logOutFailureAction>
  | ReturnType<typeof logInErrorInitAction>;
