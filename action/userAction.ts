import {
  LOG_IN_ERROR_INIT,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  EDIT_INFO_FAILUER,
  EDIT_INFO_REQUEST,
  EDIT_INFO_SUCCESS,
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

export const editInfoRequestAction = (data: EditInfoData) => {
  return {
    type: EDIT_INFO_REQUEST,
    data,
  };
};

export const editInfoSuccessAction = (data: EditInfoData) => {
  return {
    type: EDIT_INFO_SUCCESS,
    data,
  };
};

export const editInfoFailureAction = (data: string) => {
  return {
    type: EDIT_INFO_FAILUER,
    data,
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

interface EditInfoData {
  nickname: string;
}

export type UserAction =
  | ReturnType<typeof logInRequestAction>
  | ReturnType<typeof logOutRequestAction>
  | ReturnType<typeof logInSuccessAction>
  | ReturnType<typeof logInFailureAction>
  | ReturnType<typeof logOutSuccessAction>
  | ReturnType<typeof logOutFailureAction>
  | ReturnType<typeof logInErrorInitAction>
  | ReturnType<typeof editInfoRequestAction>
  | ReturnType<typeof editInfoSuccessAction>
  | ReturnType<typeof editInfoFailureAction>;
