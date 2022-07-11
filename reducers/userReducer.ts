import produce from "immer";
import { UserAction } from "../action/userAction";
import {
  AVATAR_DELETE,
  AVATAR_EDIT_DELETE,
  AVATAR_EDIT_FAILURE,
  AVATAR_EDIT_REQUEST,
  AVATAR_EDIT_SUCCESS,
  AVATAR_UPLOAD_FAILURE,
  AVATAR_UPLOAD_REQUEST,
  AVATAR_UPLOAD_SUCCESS,
  EDIT_INFO_FAILURE,
  EDIT_INFO_REQUEST,
  EDIT_INFO_SUCCESS,
  LOG_IN_ERROR_INIT,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  MY_INFO_LOAD_FAILURE,
  MY_INFO_LOAD_REQUEST,
  MY_INFO_LOAD_SUCCESS,
  USER_FOLLOW_FAILURE,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_LOAD_FAILURE,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
} from "../action/types";

const initialState: UserState = {
  logInDone: false,
  logInLoading: false,
  logInError: null,
  logOutDone: false,
  logOutLoading: false,
  logOutError: null,
  editLoading: false,
  editDone: false,
  editError: null,
  avatarUploadLoading: false,
  avatarUploadDone: false,
  avatarUploadError: null,
  avatarEditLoading: false,
  avatarEditDone: false,
  avatarEditError: null,
  myInfoLoadLoading: false,
  myInfoLoadDone: false,
  myInfoLoadError: null,
  userLoadLoading: false,
  userLoadDone: false,
  userLoadError: null,
  userFollowLoading: false,
  userFollowDone: false,
  userFollowError: null,
  userInfo: null,
  me: null,
  avatarPaths: "null",
};

export interface UserState {
  logInDone: boolean;
  logInLoading: boolean;
  logInError: string;
  logOutDone: boolean;
  logOutLoading: boolean;
  logOutError: string;
  editLoading: boolean;
  editDone: boolean;
  editError: string;
  avatarUploadLoading: boolean;
  avatarUploadDone: boolean;
  avatarUploadError: string;
  avatarPaths: string;
  avatarEditLoading: boolean;
  avatarEditDone: boolean;
  avatarEditError: string;
  myInfoLoadLoading: boolean;
  myInfoLoadDone: boolean;
  myInfoLoadError: string;
  userLoadLoading: boolean;
  userLoadDone: boolean;
  userLoadError: string;
  userFollowLoading: boolean;
  userFollowDone: boolean;
  userFollowError: string;
  userInfo: {
    id: number;
    nickname: string;
    email: string;
    Posts: {}[];
    Followers: {}[];
    Followings: {}[];
    avatar: string;
    updatedAt: string;
    createdAt: string;
  };
  me: {
    id: number;
    nickname: string;
    email: string;
    Posts: {}[];
    Followers: {}[];
    Followings: {}[];
    avatar: string;
    updatedAt: string;
    createdAt: string;
  };
}

const userReducer = (state = initialState, action: UserAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.logInError = null;
        draft.logOutDone = false;
        draft.me = action.data;
        draft.avatarPaths = action.data.avatar;
        break;
      case LOG_IN_FAILURE:
        draft.logInDone = false;
        draft.logInLoading = false;
        draft.logInError = action.data;
        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;

        break;

      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logOutError = null;
        draft.logInDone = false;
        draft.me = null;

        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutDone = false;
        draft.logOutError = action.data;
        break;
      case LOG_IN_ERROR_INIT:
        draft.logInError = null;
        break;
      case EDIT_INFO_REQUEST:
        draft.editLoading = true;
        draft.editDone = false;
        draft.editError = null;
        break;
      case EDIT_INFO_SUCCESS:
        draft.editLoading = false;
        draft.editDone = true;
        draft.editError = null;
        draft.me.nickname = action.data.nickname;
        draft.me.avatar = action.data.avatar;
        break;
      case EDIT_INFO_FAILURE:
        draft.editLoading = false;
        draft.editDone = false;
        draft.editError = action.data;
        break;
      case AVATAR_EDIT_REQUEST:
        draft.avatarEditLoading = true;
        draft.avatarEditDone = false;
        draft.avatarEditError = null;
        break;
      case AVATAR_EDIT_SUCCESS:
        draft.avatarEditLoading = false;
        draft.avatarEditDone = true;
        draft.avatarEditError = null;
        draft.avatarPaths = action.data;
        draft.me.avatar = action.data;
        break;
      case AVATAR_EDIT_FAILURE:
        draft.avatarEditLoading = false;
        draft.avatarEditDone = false;
        draft.avatarEditError = action.data;
        break;
      case AVATAR_UPLOAD_REQUEST:
        draft.avatarUploadLoading = true;
        draft.avatarUploadDone = false;
        draft.avatarUploadError = null;
        break;
      case AVATAR_UPLOAD_SUCCESS:
        draft.avatarUploadLoading = false;
        draft.avatarUploadDone = true;
        draft.avatarUploadError = null;
        draft.avatarPaths = action.data;
        break;
      case AVATAR_UPLOAD_FAILURE:
        draft.avatarUploadLoading = false;
        draft.avatarUploadDone = false;
        draft.avatarUploadError = action.data;
        break;
      case AVATAR_DELETE:
        draft.avatarPaths = "null";
        draft.avatarUploadDone = false;
        break;
      case AVATAR_EDIT_DELETE:
        draft.avatarPaths = "null";
        draft.me.avatar = "null";
        draft.avatarUploadDone = false;
        break;
      case MY_INFO_LOAD_REQUEST:
        draft.myInfoLoadLoading = true;
        draft.myInfoLoadDone = false;
        draft.myInfoLoadError = null;
        break;
      case MY_INFO_LOAD_SUCCESS:
        draft.myInfoLoadLoading = false;
        draft.myInfoLoadDone = true;
        draft.myInfoLoadError = null;
        draft.me = action.data;

        break;
      case MY_INFO_LOAD_FAILURE:
        draft.myInfoLoadLoading = false;
        draft.myInfoLoadDone = false;
        draft.myInfoLoadError = action.data;
        break;

      case USER_LOAD_REQUEST:
        draft.userLoadLoading = true;
        draft.userLoadDone = false;
        draft.userLoadError = null;
        break;
      case USER_LOAD_SUCCESS:
        draft.userLoadLoading = false;
        draft.userLoadDone = true;
        draft.userLoadError = null;
        draft.userInfo = action.data;
        break;
      case USER_LOAD_FAILURE:
        draft.userLoadLoading = false;
        draft.userLoadDone = false;
        draft.userLoadError = action.data;
        break;
      case USER_FOLLOW_REQUEST:
        draft.userFollowLoading = true;
        draft.userFollowDone = false;
        draft.userFollowError = null;
        break;
      case USER_FOLLOW_SUCCESS:
        draft.userFollowLoading = false;
        draft.userFollowDone = true;
        draft.userFollowError = null;
        draft.me.Followings.push(action.data);
        draft.userInfo.Followers.push(action.data);
        break;
      case USER_FOLLOW_FAILURE:
        draft.userFollowLoading = false;
        draft.userFollowDone = false;
        draft.userFollowError = action.data;
        break;
      default:
        break;
    }
  });

export default userReducer;
