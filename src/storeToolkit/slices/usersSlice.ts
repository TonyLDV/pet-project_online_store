import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models/IUsers";
import { getUser, postUser } from "../actions/users";
import { RootState } from "../store";

interface UsersState {
  activeUser: IUser;
  auth: boolean;
  loading: boolean;
  error: null | string;
}

const auth = "auth";
const activeUser = "activeUser";

const initialState: UsersState = {
  auth: JSON.parse(localStorage.getItem(auth) ?? "false"),
  activeUser: JSON.parse(localStorage.getItem(activeUser) ?? "{}"),
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetActiveUser(state) {
      state.auth = false;
      state.error = null;
      state.activeUser = {} as IUser;
      localStorage.setItem(auth, JSON.stringify(false));
      localStorage.setItem(activeUser, JSON.stringify({}));
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload) {
        state.auth = true;
        state.activeUser = payload as IUser;

        localStorage.setItem(auth, JSON.stringify(state.auth));
        localStorage.setItem(activeUser, JSON.stringify(state.activeUser));
      }
      if (!payload) {
        state.error = "Щось пішло не так";
      }
    });

    builder.addCase(postUser.rejected, () => {});

    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (Object.keys(payload).length) {
        state.auth = true;
        state.activeUser = payload as IUser;
        localStorage.setItem(auth, JSON.stringify(state.auth));
        localStorage.setItem(activeUser, JSON.stringify(state.activeUser));
      }
      if (!Object.keys(payload).length) {
        state.error = "Неправильний емейл або пароль =(";
      }
    });

    builder.addCase(getUser.rejected, (state) => {
      state.error = "Неправильний емейл або пароль =(";
    });
  },
});

export const userSelector = (state: RootState) => state.user;
export const usersActions = usersSlice.actions;
export const userReducer = usersSlice.reducer;
