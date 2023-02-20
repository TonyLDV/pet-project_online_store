import { AuthAction, AuthActionTypes, AuthState } from "../types/auth";

const initialState: AuthState = {
  auth: false,
};

export const auth = (
  state = initialState,
  { type, payload }: AuthAction
): AuthState => {
  switch (type) {
    case AuthActionTypes.AUTH:
      return {
        ...state,
        auth: true,
      };

    default:
      return state;
  }
};
