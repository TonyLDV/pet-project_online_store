import { AuthAction, AuthActionTypes } from "../types/users";
import { LocalStorageKey, storage } from "../../LocaleStorage";
import axios from "axios";
import { Dispatch } from "redux";

export function setAuth() {
  return { type: AuthActionTypes.AUTH };
}

export function createUser(user: any) {
  const cacheUsers = storage.getItem(LocalStorageKey.USERS);

  const users = cacheUsers || {};

  if (!users[user.email]) {
    const e = { [user.email]: user };

    const newUsers = Object.assign(users, e);

    axios.post("https://6431bdbb3adb1596517346ee.mockapi.io/users", {
      [user.email]: user,
    });

    /*    axios.post(shoppingUrl.href, {
      email: user.email,
    });*/

    /*    axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });*/
    storage.setItem(LocalStorageKey.USERS, newUsers);
  }

  return { type: AuthActionTypes.CREATE_USER, payload: user };
}

export function logInUser(user: any) {
  return async (dispatch: Dispatch<AuthAction>) => {
    const cacheUsers = storage.getItem(LocalStorageKey.USERS);
    const shoppingUrl = new URL(
      "https://645141a8e1f6f1bb22ac663f.mockapi.io/shoppinginfo"
    );

    shoppingUrl.searchParams.append("filter", user.email);

    const response = await axios.get(shoppingUrl.href);

    const users = cacheUsers || {};

    if (users[user.email] && users[user.email].password === user.password) {
      const activeUser = { [user.email]: users[user.email] };

      storage.setItem(LocalStorageKey.AUTH, true);
      storage.setItem(LocalStorageKey.ACTIVE_USER, activeUser);
    }
    dispatch({
      type: AuthActionTypes.USER_LOG_IN,
      payload: user,
    });
  };
}

export function logOutUser() {
  storage.setItem(LocalStorageKey.AUTH, false);
  storage.setItem(LocalStorageKey.ACTIVE_USER, null);

  return { type: AuthActionTypes.USER_LOG_OUT };
}
