import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  POST_IMAGE_DELETE,
  POST_IMAGE_UPLOAD_FAILURE,
  POST_IMAGE_UPLOAD_REQUEST,
  POST_IMAGE_UPLOAD_SUCCESS,
} from "./types";

export const addPostRequestAction = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
};

export const addPostSuccessAction = (data) => {
  return {
    type: ADD_POST_SUCCESS,
    data,
  };
};

export const addPostFailureAction = (data: string) => {
  return {
    type: ADD_POST_FAILURE,
    data,
  };
};

export const postImageUploadRequestAction = (data) => {
  return {
    type: POST_IMAGE_UPLOAD_REQUEST,
    data,
  };
};

export const postImageUploadSuccessAction = (data) => {
  return {
    type: POST_IMAGE_UPLOAD_SUCCESS,
    data,
  };
};

export const postImageUploadFailureAction = (data) => {
  return {
    type: POST_IMAGE_UPLOAD_FAILURE,
    data,
  };
};

export const postImageDeleteAction = (data) => {
  return {
    type: POST_IMAGE_DELETE,
    data,
  };
};

export const addCommentRequestAction = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
};

export const addCommentSuccessAction = (data) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    data,
  };
};

export const addCommentFailureAction = (data: string) => {
  return {
    type: ADD_COMMENT_FAILURE,
    data,
  };
};

export type PostActionType =
  | ReturnType<typeof addPostRequestAction>
  | ReturnType<typeof addPostSuccessAction>
  | ReturnType<typeof addPostFailureAction>
  | ReturnType<typeof postImageUploadRequestAction>
  | ReturnType<typeof postImageUploadSuccessAction>
  | ReturnType<typeof postImageUploadFailureAction>
  | ReturnType<typeof postImageDeleteAction>
  | ReturnType<typeof addCommentRequestAction>
  | ReturnType<typeof addCommentSuccessAction>
  | ReturnType<typeof addCommentFailureAction>;
