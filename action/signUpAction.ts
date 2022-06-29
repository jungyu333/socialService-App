import { SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "./types";

export const signUpRequestAction = (data: SignUpData) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

export const signUpSuccessAction = (data: SignUpData) => {
  return {
    type: SIGN_UP_SUCCESS,
    data,
  };
};

export interface SignUpData {
  email: string;
  name: string;
  password: string;
}

export const signUpFailureAction = (data: string) => {
  return {
    type: SIGN_UP_FAILURE,
    data,
  };
};

export type SignUpAction =
  | ReturnType<typeof signUpRequestAction>
  | ReturnType<typeof signUpSuccessAction>
  | ReturnType<typeof signUpFailureAction>;
