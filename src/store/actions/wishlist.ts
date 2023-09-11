import { WishlistActionTypes } from "../types/wishlist";
import { LocalStorageKey, storage } from "../../LocaleStorage";

export function createWish(item: any) {
  const cacheWishlist = storage.getItem(LocalStorageKey.WISHLIST);

  const wishlist = cacheWishlist || [];

  const duplicates = wishlist.filter(
    (wishlistItem: { id: number }) => wishlistItem.id === item.id
  );

  if (duplicates.length === 0) {
    const itemToAdd = {
      ...item,
      wish: !item.wish,
    };
    wishlist.push(itemToAdd);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

  }

  return {
    type: WishlistActionTypes.CREATE_WISH,
    payload: item,
  };
}

export function deleteWish(id: number) {
  const wishlist = JSON.parse(<string>localStorage.getItem("wishlist"));

  const newWishlist = wishlist.filter(
    (cartItem: { id: number }) => cartItem.id !== id
  );
  localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  return {
    type: WishlistActionTypes.DELETE_WISH,
    payload: id,
  };
}
