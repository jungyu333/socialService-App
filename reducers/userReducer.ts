import { ActionType } from "../action/actions";
import { LOG_IN, LOG_OUT } from "../action/types";

const initialState: LogInState = {
  isLogIn: false,
  user: null,
};

export interface LogInState {
  isLogIn: boolean;
  user: {
    id: number;
    email: string;
    password: string;
  };
}

const dummyUser = {
  id: 1,
  email: "jungyu@naver.com",
  password: "123456",
};

const userReducer = (state = initialState, aciton: ActionType) => {
  switch (aciton.type) {
    case LOG_IN:
      return {
        isLogIn: true,
        user: { id: dummyUser.id, ...aciton.payload },
      };

    case LOG_OUT:
      return {
        isLogIn: false,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
