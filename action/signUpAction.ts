import {
  SIGN_UP_ERROR_INIT,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "./types";

export const signUpRequestAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

export const signUpSuccessAction = () => {
  return {
    type: SIGN_UP_SUCCESS,
    data: null,
  };
};

export const signUpFailureAction = (data) => {
  return {
    type: SIGN_UP_FAILURE,
    data,
  };
};

export type SignUpAction =
  | ReturnType<typeof signUpRequestAction>
  | ReturnType<typeof signUpSuccessAction>
  | ReturnType<typeof signUpFailureAction>;
