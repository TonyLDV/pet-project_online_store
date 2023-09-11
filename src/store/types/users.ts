export type AuthState = {
  auth: boolean;
  users: null | any;
  activeUser: null | object;
};

export type IUsers = {
  email: string;
  password: string;
  name: string;
  surname: string;
};

export enum AuthActionTypes {
  AUTH = "AUTH",
  CREATE_USER = "CREATE_USER",
  USER_LOG_IN = "USER_LOG_IN",
  USER_LOG_OUT = "USER_LOG_OUT",
}

export type BaseAction<T extends AuthActionTypes, K extends any = null> = {
  type: T;
  payload: K;
};

type CreateUserAction = BaseAction<AuthActionTypes.CREATE_USER, any>;

type UserLogInAction = BaseAction<AuthActionTypes.USER_LOG_IN, any>;

type UserLogOutAction = BaseAction<AuthActionTypes.USER_LOG_OUT, any>;

export type AuthAction = CreateUserAction | UserLogInAction | UserLogOutAction;
