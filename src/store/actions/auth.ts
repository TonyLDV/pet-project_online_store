import { AuthActionTypes } from "../types/auth";

export function setAuth() {
  return { type: AuthActionTypes.AUTH };
}
