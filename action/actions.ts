import { LOG_IN, LOG_OUT } from "./types";

export const logInAction = (data: LogInData) => {
  return {
    type: LOG_IN,
    payload: data,
  };
};

export const logOutAction = () => {
  return {
    type: LOG_OUT,
  };
};

interface LogInData {
  email: string;
  password: string;
}

export type ActionType =
  | ReturnType<typeof logInAction>
  | ReturnType<typeof logOutAction>;
