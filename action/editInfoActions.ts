import {
  EDIT_INFO_FAILUER,
  EDIT_INFO_REQUEST,
  EDIT_INFO_SUCCESS,
} from "./types";

export const editInfoRequestAction = (data: EditInfoData) => {
  return {
    type: EDIT_INFO_REQUEST,
    data,
  };
};

export const editInfoSuccessAction = (data: EditInfoData) => {
  return {
    type: EDIT_INFO_SUCCESS,
    data,
  };
};

export const editInfoFailureAction = (data: string) => {
  return {
    type: EDIT_INFO_FAILUER,
    data,
  };
};

interface EditInfoData {
  email: string;
  name: string;
}

export type EditInfoAction =
  | ReturnType<typeof editInfoRequestAction>
  | ReturnType<typeof editInfoSuccessAction>
  | ReturnType<typeof editInfoFailureAction>;
