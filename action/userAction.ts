import {
  LOG_IN_ERROR_INIT,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  EDIT_INFO_REQUEST,
  EDIT_INFO_SUCCESS,
  AVATAR_UPLOAD_FAILURE,
  AVATAR_UPLOAD_REQUEST,
  AVATAR_UPLOAD_SUCCESS,
  AVATAR_DELETE,
  EDIT_INFO_FAILURE,
  AVATAR_EDIT_REQUEST,
  AVATAR_EDIT_FAILURE,
  AVATAR_EDIT_SUCCESS,
  AVATAR_EDIT_DELETE,
  MY_INFO_LOAD_REQUEST,
  MY_INFO_LOAD_SUCCESS,
  MY_INFO_LOAD_FAILURE,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAILURE,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAILURE,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAILURE,
  AVATAR_SET,
  FOLLOWING_LOAD_REQUEST,
  FOLLOWING_LOAD_SUCCESS,
  FOLLOWING_LOAD_FAILURE,
  REMOVE_MY_FOLLOWING_REQUEST,
  REMOVE_MY_FOLLOWING_SUCCESS,
  REMOVE_MY_FOLLOWING_FAILURE,
} from "./types";

export const logInRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logInSuccessAction = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};

export const logInFailureAction = (data) => {
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

export const logOutFailureAction = (data) => {
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

export const editInfoRequestAction = (data) => {
  return {
    type: EDIT_INFO_REQUEST,
    data,
  };
};

export const editInfoSuccessAction = (data) => {
  return {
    type: EDIT_INFO_SUCCESS,
    data,
  };
};

export const editInfoFailureAction = (data) => {
  return {
    type: EDIT_INFO_FAILURE,
    data,
  };
};

export const avatarUploadRequestAction = (data) => {
  return {
    type: AVATAR_UPLOAD_REQUEST,
    data,
  };
};

export const avatarUploadSuccessAction = (data) => {
  return {
    type: AVATAR_UPLOAD_SUCCESS,
    data,
  };
};

export const avatarUploadFailureAction = (data) => {
  return {
    type: AVATAR_UPLOAD_FAILURE,
    data,
  };
};

export const avatarDeleteAction = () => {
  return {
    type: AVATAR_DELETE,
    data: null,
  };
};

export const avatarSetAction = (data) => {
  return {
    type: AVATAR_SET,
    data,
  };
};

export const avatarEditSuccessAction = (data) => {
  return {
    type: AVATAR_EDIT_SUCCESS,
    data,
  };
};

export const avatarEditFailureAction = (data) => {
  return {
    type: AVATAR_EDIT_FAILURE,
    data,
  };
};

export const avatarEditRequestAction = (data) => {
  return {
    type: AVATAR_EDIT_REQUEST,
    data,
  };
};

export const avatarEditDeleteAction = () => {
  return {
    type: AVATAR_EDIT_DELETE,
    data: null,
  };
};

export const myInfoLoadRequestAction = () => {
  return {
    type: MY_INFO_LOAD_REQUEST,
    data: null,
  };
};

export const myInfoLoadSuccessAction = (data) => {
  return {
    type: MY_INFO_LOAD_SUCCESS,
    data,
  };
};

export const myInfoLoadFailureAction = (data) => {
  return {
    type: MY_INFO_LOAD_FAILURE,
    data,
  };
};

export const userLoadRequestAction = (data) => {
  return {
    type: USER_LOAD_REQUEST,
    data,
  };
};

export const userLoadSuccessAction = (data) => {
  return {
    type: USER_LOAD_SUCCESS,
    data,
  };
};

export const userLoadFailureAction = (data) => {
  return {
    type: USER_LOAD_FAILURE,
    data,
  };
};

export const userFollowRequestAction = (data) => {
  return {
    type: USER_FOLLOW_REQUEST,
    data,
  };
};

export const userFollowSuccessAction = (data) => {
  return {
    type: USER_FOLLOW_SUCCESS,
    userId: data.userId,
    myId: data.myId,
  };
};

export const userFollowFailureAction = (data) => {
  return {
    type: USER_FOLLOW_FAILURE,
    data,
  };
};

export const userUnFollowRequestAction = (data) => {
  return {
    type: USER_UNFOLLOW_REQUEST,
    data,
  };
};

export const userUnFollowSuccessAction = (data) => {
  return {
    type: USER_UNFOLLOW_SUCCESS,
    userId: data.userId,
    myId: data.myId,
  };
};

export const userUnFollowFailureAction = (data) => {
  return {
    type: USER_UNFOLLOW_FAILURE,
    data,
  };
};

export const followingLoadRequestAcion = (data) => {
  return {
    type: FOLLOWING_LOAD_REQUEST,
    data,
  };
};

export const followingLoadSuccessAction = (data) => {
  return {
    type: FOLLOWING_LOAD_SUCCESS,
    data,
  };
};

export const followingLoadFailureAction = (data) => {
  return {
    type: FOLLOWING_LOAD_FAILURE,
    data,
  };
};

export const removeMyFollowingRequestAction = (data) => {
  return {
    type: REMOVE_MY_FOLLOWING_REQUEST,
    data,
  };
};

export const removeMyFollowingSuccessAction = (data) => {
  return {
    type: REMOVE_MY_FOLLOWING_SUCCESS,
    data,
  };
};

export const removeMyFollowingFailureAction = (data) => {
  return {
    type: REMOVE_MY_FOLLOWING_FAILURE,
    data,
  };
};

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
  | ReturnType<typeof editInfoFailureAction>
  | ReturnType<typeof avatarUploadRequestAction>
  | ReturnType<typeof avatarUploadSuccessAction>
  | ReturnType<typeof avatarUploadFailureAction>
  | ReturnType<typeof avatarDeleteAction>
  | ReturnType<typeof avatarEditRequestAction>
  | ReturnType<typeof avatarEditSuccessAction>
  | ReturnType<typeof avatarEditFailureAction>
  | ReturnType<typeof avatarEditDeleteAction>
  | ReturnType<typeof myInfoLoadRequestAction>
  | ReturnType<typeof myInfoLoadSuccessAction>
  | ReturnType<typeof myInfoLoadFailureAction>
  | ReturnType<typeof userLoadRequestAction>
  | ReturnType<typeof userLoadSuccessAction>
  | ReturnType<typeof userLoadFailureAction>
  | ReturnType<typeof userFollowRequestAction>
  | ReturnType<typeof userFollowSuccessAction>
  | ReturnType<typeof userFollowFailureAction>
  | ReturnType<typeof userUnFollowRequestAction>
  | ReturnType<typeof userUnFollowSuccessAction>
  | ReturnType<typeof userUnFollowFailureAction>
  | ReturnType<typeof avatarSetAction>
  | ReturnType<typeof followingLoadRequestAcion>
  | ReturnType<typeof followingLoadSuccessAction>
  | ReturnType<typeof followingLoadFailureAction>
  | ReturnType<typeof removeMyFollowingRequestAction>
  | ReturnType<typeof removeMyFollowingSuccessAction>
  | ReturnType<typeof removeMyFollowingFailureAction>;
