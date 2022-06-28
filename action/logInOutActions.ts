import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from "./types";

export const logInRequestAction = (data: LogInData) => {
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

export const logInFailureAction = () => {
  return {
    type: LOG_IN_FAILURE,
  };
};

export const logOutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const logOutSuccessAction = () => {
  return {
    type: LOG_OUT_SUCCESS,
  };
};

export const logOutFailureAction = () => {
  return {
    type: LOG_OUT_FAILURE,
  };
};

interface LogInData {
  email: string;
  password: string;
}

export type LogInOutActionType =
  | ReturnType<typeof logInRequestAction>
  | ReturnType<typeof logOutRequestAction>
  | ReturnType<typeof logInSuccessAction>
  | ReturnType<typeof logInFailureAction>
  | ReturnType<typeof logOutSuccessAction>
  | ReturnType<typeof logOutFailureAction>;
