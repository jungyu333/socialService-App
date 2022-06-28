import { SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "./types";

export const signUpRequestAction = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

export const signUpSuccessAction = () => {
  return {
    type: SIGN_UP_SUCCESS,
  };
};

export const signUpFailureAction = (data) => {
  return {
    type: SIGN_UP_FAILURE,
    error: data,
  };
};

export type SignUpAction =
  | ReturnType<typeof signUpRequestAction>
  | ReturnType<typeof signUpSuccessAction>
  | ReturnType<typeof signUpFailureAction>;
