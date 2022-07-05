import produce from "immer";
import { PostActionType } from "../action/postActions";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  POST_IMAGE_DELETE,
  POST_IMAGE_UPLOAD_FAILURE,
  POST_IMAGE_UPLOAD_REQUEST,
  POST_IMAGE_UPLOAD_SUCCESS,
} from "../action/types";

const initialState: PostState = {
  postImageUploadLoading: false,
  postImageUploadDone: false,
  postImageUploadError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  imagePaths: [],
  mainPosts: [],
};

const dummyData = (data) => ({
  id: 2,
  User: { id: 21, name: "jungyu" },
  content: data,
  Images: [{}],
  Comments: [
    { User: { name: "jun1" }, content: "comment11" },
    { User: { name: "jun2" }, content: "comment22" },
  ],
});

export interface PostState {
  postImageUploadLoading: boolean;
  postImageUploadDone: boolean;
  postImageUploadError: string;
  addPostLoading: boolean;
  addPostError: string;
  addPostDone: boolean;
  mainPosts: {
    id: number;
    User: { id: number; nickname: string; avatar: string };
    UserId: number;
    content: string;
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

      default:
        break;
    }
  });

export default postReducer;
