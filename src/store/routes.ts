import {
  ANIMATION_ROUTE,
  CART_ROUTE,
  MAIN_ROUTE,
  MEN_ROUTE,
  WISHLIST_ROUTE,
  WOMEN_ROUTE,
} from "../utils/constRoutes";
import Main from "../views/Main";
import Wishlist from "../components/Wishlist";
import Cart from "../views/Cart";
import SwitchGenderTemplate from "../views/SwitchGenderTemplate";
import ItemInfo from "../components/ItemInfo";
import { ShoesType } from "../constants";

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
  { path: WISHLIST_ROUTE + "/:id", Component: ItemInfo },
  { path: CART_ROUTE, Component: Cart },
  { path: WISHLIST_ROUTE, Component: Wishlist },
];

export const privateRoutes = [{ path: MAIN_ROUTE, Component: Main }];
