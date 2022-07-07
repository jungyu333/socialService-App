import produce from "immer";
import { PostActionType } from "../action/postActions";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
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
} from "../action/types";

const initialState: PostState = {
  postImageUploadLoading: false,
  postImageUploadDone: false,
  postImageUploadError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  postDeleteLoading: false,
  postDeleteDone: false,
  postDeleteError: null,
  postLoadLoading: false,
  postLoadDone: false,
  postLoadError: null,
  hasMorePosts: true,
  imagePaths: [],
  mainPosts: [],
};

export interface PostState {
  postImageUploadLoading: boolean;
  postImageUploadDone: boolean;
  postImageUploadError: string;
  addPostLoading: boolean;
  addPostError: string;
  addPostDone: boolean;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: string;
  postDeleteLoading: boolean;
  postDeleteDone: boolean;
  postDeleteError: string;
  postLoadLoading: boolean;
  postLoadDone: boolean;
  postLoadError: string;
  hasMorePosts: boolean;
  mainPosts: {
    id: number;
    User: { id: number; nickname: string; avatar: string };
    UserId: number;
    content: string;
    Comments: {
      id: number;
      User: {
        id: number;
        avatar: string;
        nickname: string;
      };
      content: string;
      createdAt: string;
      updatedAt: string;
      UserId: number;
      PostId: number;
    }[];
    Images: {
      id: number;
      src: string;
      createdAt: string;
      updatedAt: string;
      PostId: number;
    }[];
    createdAt: string;
    updatedAt: string;
  }[];
  imagePaths: string[];
}

const postReducer = (state = initialState, action: PostActionType) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_IMAGE_UPLOAD_REQUEST:
        draft.postImageUploadLoading = true;
        draft.postImageUploadDone = false;
        draft.postImageUploadError = null;
        break;
      case POST_IMAGE_UPLOAD_SUCCESS:
        draft.postImageUploadLoading = false;
        draft.postImageUploadDone = true;
        draft.postImageUploadError = null;
        draft.imagePaths = action.data;
        break;
      case POST_IMAGE_UPLOAD_FAILURE:
        draft.postImageUploadLoading = false;
        draft.postImageUploadDone = false;
        draft.postImageUploadError = action.data;
        break;
      case POST_IMAGE_DELETE:
        draft.imagePaths = draft.imagePaths.filter(
          (image) => image !== action.data
        );
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.addPostError = null;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostDone = false;
        draft.addPostError = action.data;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.PostId
        );
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentDone = false;
        draft.addCommentError = action.data;
        break;
      case POST_DELETE_REQUEST:
        draft.postDeleteLoading = true;
        draft.postDeleteDone = false;
        draft.postDeleteError = null;
        break;
      case POST_DELETE_SUCCESS:
        draft.postDeleteLoading = false;
        draft.postDeleteDone = true;
        draft.postDeleteError = null;
        draft.mainPosts = draft.mainPosts.filter(
          (post) => post.id !== parseInt(action.data.postId)
        );
        break;
      case POST_DELETE_FAILURE:
        draft.postDeleteLoading = false;
        draft.postDeleteDone = false;
        draft.postDeleteError = action.data;
        break;
      case POST_LOAD_REQUEST:
        draft.postLoadLoading = true;
        draft.postLoadDone = false;
        draft.postLoadError = null;
        break;
      case POST_LOAD_SUCCESS:
        draft.postLoadLoading = false;
        draft.postLoadDone = true;
        draft.postLoadError = null;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      case POST_LOAD_FAILURE:
        draft.postLoadLoading = false;
        draft.postLoadDone = false;
        draft.postLoadError = action.data;
        break;

      default:
        break;
    }
  });

export default postReducer;
