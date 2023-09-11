import {
  CART_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  MEN_ROUTE,
  SETTINGS_ROUTE,
  SIGNUP_ROUTE,
  WISHLIST_ROUTE,
  WOMEN_ROUTE,
} from "../utils/constRoutes";
import { ShoesType, SignType } from "../constants";

import Cart from "../views/Cart";
import Main from "../views/Main";
import SignPage from "../views/SignPage";
import ItemInfo from "../components/ItemInfo";
import Wishlist from "../components/Wishlist";
import SwitchGenderTemplate from "../views/SwitchGenderTemplate";
import SettingsPage from "../views/SettingsPage/SettingsPage";

export const publicRoutes = [
  { path: MAIN_ROUTE, Component: Main },
  {
    path: MEN_ROUTE,
    Component: SwitchGenderTemplate,
    type: ShoesType.MEN,
  },
  {
    path: WOMEN_ROUTE,
    Component: SwitchGenderTemplate,
    type: ShoesType.WOMEN,
  },
  { path: MEN_ROUTE + "/:id", Component: ItemInfo },
  { path: CART_ROUTE + "/:id", Component: ItemInfo },
  { path: WOMEN_ROUTE + "/:id", Component: ItemInfo },
  { path: MAIN_ROUTE + LOGIN_ROUTE, Component: SignPage },
  { path: WISHLIST_ROUTE, Component: Wishlist },
  { path: WISHLIST_ROUTE + "/:id", Component: ItemInfo },
  { path: CART_ROUTE, Component: Cart },
  { path: SETTINGS_ROUTE, Component: SettingsPage },
];

export const modalRoutes = [
  { path: LOGIN_ROUTE, Component: SignPage, type: SignType.LOGIN },
  { path: SIGNUP_ROUTE, Component: SignPage, type: SignType.SIGNUP },
];

export const privateRoutes = [{ path: MAIN_ROUTE, Component: Main }];
