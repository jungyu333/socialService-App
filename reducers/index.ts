import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import signUpReducer from "./signUpReducer";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        userReducer,
        postReducer,
        signUpReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
