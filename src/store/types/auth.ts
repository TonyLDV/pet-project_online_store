export type AuthState = {
  auth: boolean;
};

export enum AuthActionTypes {
  AUTH = "AUTH",
}

export type BaseAction<T extends AuthActionTypes, K extends any = null> = {
  type: T;
  payload: K;
};

type FetchShoesSelectedAction = BaseAction<AuthActionTypes.AUTH>;

export type AuthAction = FetchShoesSelectedAction;
