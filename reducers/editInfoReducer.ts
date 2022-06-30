import produce from "immer";
import { EditInfoAction } from "../action/editInfoActions";
import {
  EDIT_INFO_FAILUER,
  EDIT_INFO_REQUEST,
  EDIT_INFO_SUCCESS,
} from "../action/types";

const initialState: EditState = {
  editLoading: false,
  editDone: false,
  editError: null,
};

interface EditState {
  editLoading: boolean;
  editDone: boolean;
  editError: string;
}

const editInfoReducer = (state = initialState, action: EditInfoAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case EDIT_INFO_REQUEST:
        draft.editLoading = true;
        draft.editDone = false;
        draft.editError = null;
        break;
      case EDIT_INFO_SUCCESS:
        draft.editLoading = false;
        draft.editDone = true;
        draft.editError = null;
        break;
      case EDIT_INFO_FAILUER:
        draft.editLoading = false;
        draft.editDone = false;
        draft.editError = action.data;
        break;
      default:
        break;
    }
  });

export default editInfoReducer;
