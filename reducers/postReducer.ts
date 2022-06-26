import { ActionType } from "../action/actions";
import { ADD_POST } from "../action/types";

const initialState: PostState = {
  mainPosts: [
    {
      id: 1,
      User: { id: 1, name: "jun" },
      content: "post1",
      Images: [{}],
    },
  ],
  Comments: [
    {
      User: { name: "jun" },
      content: "comment1",
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const dummyData = {
  id: 2,
  User: { id: 21, name: "jungyu" },
  content: "안녕",
  Images: [{}],
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
  imagePaths: {}[];
  postAdded: boolean;
}

const postReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyData, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default postReducer;
