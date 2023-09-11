import * as WishlistActionCreators from "./wishlist";
import * as ShoesActionCreators from "./shoes";
import * as CartActionCreators from "./cart";
import * as AuthActionCreators from "./users";

export default {
  ...WishlistActionCreators,
  ...ShoesActionCreators,
  ...CartActionCreators,
  ...AuthActionCreators,
};
