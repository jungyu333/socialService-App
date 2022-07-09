import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_LIKE_FAILURE,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  COMMENT_REMOVE_FAILURE,
  COMMENT_REMOVE_REQUEST,
  COMMENT_REMOVE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_IMAGE_DELETE,
  POST_IMAGE_UPLOAD_FAILURE,
  POST_IMAGE_UPLOAD_REQUEST,
  POST_IMAGE_UPLOAD_SUCCESS,
  POST_LOAD_FAILURE,
  POST_LOAD_REQUEST,
  POST_LOAD_SUCCESS,
  REMOVE_LIKE_FAILURE,
  REMOVE_LIKE_REQUEST,
  REMOVE_LIKE_SUCCESS,
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

export const postDeleteRequestAction = (data) => {
  return {
    type: POST_DELETE_REQUEST,
    data,
  };
};

export const postDeleteSuccessAction = (data) => {
  return {
    type: POST_DELETE_SUCCESS,
    data,
  };
};

export const postDeleteFailureAction = (data) => {
  return {
    type: POST_DELETE_FAILURE,
    data,
  };
};

export const postLoadRequestAction = (data) => {
  return {
    type: POST_LOAD_REQUEST,
    data,
  };
};

export const postLoadSuccessAction = (data) => {
  return {
    type: POST_LOAD_SUCCESS,
    data,
  };
};

export const postLoadFailureAction = (data) => {
  return {
    type: POST_LOAD_FAILURE,
    data,
  };
};

export const commentRemoveRequestAction = (data) => {
  return {
    type: COMMENT_REMOVE_REQUEST,
    data,
  };
};

export const commentRemoveSuccessAction = (data) => {
  return {
    type: COMMENT_REMOVE_SUCCESS,
    data,
  };
};

export const commentRemoveFailureAction = (data) => {
  return {
    type: COMMENT_REMOVE_FAILURE,
    data,
  };
};

export const addLikeRequestAction = (data) => {
  return {
    type: ADD_LIKE_REQUEST,
    data,
  };
};

export const addLikeSuccessAction = (data) => {
  return {
    type: ADD_LIKE_SUCCESS,
    data,
  };
};

export const addLikeFailureAction = (data) => {
  return {
    type: ADD_LIKE_FAILURE,
    data,
  };
};

export const removeLikeRequestAction = (data) => {
  return {
    type: REMOVE_LIKE_REQUEST,
    data,
  };
};

export const removeLikeSuccessAction = (data) => {
  return {
    type: REMOVE_LIKE_SUCCESS,
    data,
  };
};

export const removeLikeFailureAction = (data) => {
  return {
    type: REMOVE_LIKE_FAILURE,
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
  | ReturnType<typeof addCommentFailureAction>
  | ReturnType<typeof postDeleteRequestAction>
  | ReturnType<typeof postDeleteSuccessAction>
  | ReturnType<typeof postDeleteFailureAction>
  | ReturnType<typeof postLoadRequestAction>
  | ReturnType<typeof postLoadSuccessAction>
  | ReturnType<typeof postLoadFailureAction>
  | ReturnType<typeof commentRemoveRequestAction>
  | ReturnType<typeof commentRemoveSuccessAction>
  | ReturnType<typeof commentRemoveFailureAction>
  | ReturnType<typeof addLikeRequestAction>
  | ReturnType<typeof addLikeSuccessAction>
  | ReturnType<typeof addLikeFailureAction>
  | ReturnType<typeof removeLikeRequestAction>
  | ReturnType<typeof removeLikeSuccessAction>
  | ReturnType<typeof removeLikeFailureAction>;
