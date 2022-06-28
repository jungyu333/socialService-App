import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from "./types";

export const addPostRequestAction = (data: string) => {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
};

export const addPostSuccessAction = (data: string) => {
  return {
    type: ADD_POST_SUCCESS,
    data,
  };
};

export const addPostFailureAction = () => {
  return {
    type: ADD_POST_FAILURE,
  };
};

export type PostActionType =
  | ReturnType<typeof addPostRequestAction>
  | ReturnType<typeof addPostSuccessAction>
  | ReturnType<typeof addPostFailureAction>;
