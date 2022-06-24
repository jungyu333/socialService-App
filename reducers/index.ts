import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...(state as object), ...action.payload };
      default:
        return state;
    }
  },
  userReducer,
  postReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
