import produce from "immer";
import { SignUpAction } from "../action/signUpAction";
import {
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../action/types";

const initialState: signUpState = {
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
};

interface signUpState {
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: string;
}

const signUpReducer = (state = initialState, action: SignUpAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpDone = true;
        draft.signUpLoading = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpDone = false;
        draft.signUpLoading = false;
        draft.signUpError = action.data;
      default:
        break;
    }
  });

export default signUpReducer;
