import { ActionType } from "../action/actions";
import { ADD_POST } from "../action/types";

const initialState = {
  mainPosts: [
    {
      id: null,
      User: { id: null, name: null },
      content: null,
      Images: [{}],
    },
  ],
  Comments: [
    {
      User: { name: null },
      content: null,
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const dummyData = {
  mainPosts: [
    {
      id: 2,
      User: { id: 1, name: "jungyu" },
      content: "안녕",
      Images: [{}],
    },
  ],
};

export interface PostState {
  mainPosts: [
    {
      id: number;
      User: { id: number; name: string };
      content: string;
      Images: [{}];
    }
  ];
  Comments: [
    {
      User: { name: string };
      content: string;
    }
  ];
  imagePaths: [];
  postAdded: boolean;
}

const postReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPost: [dummyData, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default postReducer;
