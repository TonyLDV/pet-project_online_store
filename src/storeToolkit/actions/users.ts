import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userLogin, userSighUp } from "../../services/web-backend";

export const postUser = createAsyncThunk(
  "postUser",
  async ({ user }: { user: any }) => {
    try {
      const url = new URL(userSighUp);

      const response = await axios.post(url.href, user);
      localStorage.setItem("token", response.data.accessToken);

      return response.data.user;
    } catch (e) {}
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async ({ user }: { user: { email: string; password: string } }) => {
    const url = new URL(userLogin);
    const response = await axios.post(url.href, user);
    localStorage.setItem("token", response.data.accessToken);

    return response.data.user;
    /*    const url = new URL(usersURL);
    url.searchParams.append("email", user.email);
    url.searchParams.append("password", user.password);
    const { data } = await axios.get<IUser[]>(url.href);

    if (data.length) {
      return data[0];
    } else {
      return {};
    }*/
  }
);
