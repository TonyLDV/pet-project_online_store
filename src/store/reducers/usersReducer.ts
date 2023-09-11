import { AuthAction, AuthActionTypes, AuthState } from "../types/users";

const initialState: AuthState = {
  auth: localStorage.getItem("auth")
    ? JSON.parse(<string>localStorage.getItem("auth"))
    : null,
  users: localStorage.getItem("users")
    ? JSON.parse(<string>localStorage.getItem("users"))
    : {},
  activeUser: localStorage.getItem("active_user")
    ? JSON.parse(<string>localStorage.getItem("active_user"))
    : null,
};

export const usersReducer = (
  state = initialState,
  { type, payload }: AuthAction
): AuthState => {
  switch (type) {
    case AuthActionTypes.CREATE_USER:
      return { ...state, users: { ...state.users, [payload.email]: payload } };

    case AuthActionTypes.USER_LOG_IN:
      if (
        state.users[payload.email] &&
        state.users[payload.email].password === payload.password
      ) {
        return {
          ...state,
          auth: true,
          activeUser: { [payload.email]: state.users[payload.email] },
        };
      }
      return state;

    case AuthActionTypes.USER_LOG_OUT:
      return {
        ...state,
        auth: false,
        activeUser: null,
      };

    default:
      return state;
  }
};
