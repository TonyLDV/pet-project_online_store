import { CartActionTypes } from "../types/cart";
import { LocalStorageKey, storage } from "../../LocaleStorage";

export function createCart(item: any) {
  const storageResults = storage.multipleGetItems([
    { key: LocalStorageKey.CART },
    { key: LocalStorageKey.PRICE },
  ]);

  const cart = localStorage.getItem("cart")
    ? JSON.parse(<string>localStorage.getItem("cart"))
    : [];

  const price = localStorage.getItem("totalPrice")
    ? JSON.parse(<string>localStorage.getItem("totalPrice"))
    : 0;

  const duplicates = cart.filter(
    (cartItem: { id: number; size: number }) =>
      cartItem.id === item.id && cartItem.size === item.size
  );

  if (duplicates.length === 0) {
    const itemToAdd = {
      ...item,
    };
    const totalPrice = price + item.price;

    cart.push(itemToAdd);

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }

  return {
    type: CartActionTypes.CREATE_CART,
    payload: item,
  };
}

export function deleteCart(bucketId: string) {
  const cart = JSON.parse(<string>localStorage.getItem("cart"));

  const price = JSON.parse(<string>localStorage.getItem("totalPrice"));

  const newCart = cart.filter(
    (cartItem: { bucketId: string }) => cartItem.bucketId !== bucketId
  );

  const newPrice = cart.find(
    (cartItem: any) => cartItem.bucketId === bucketId
  ).price;

  const totalPrice = price - newPrice;

  localStorage.setItem("cart", JSON.stringify(newCart));
  localStorage.setItem("totalPrice", JSON.stringify(totalPrice));

  return {
    type: CartActionTypes.DELETE_CART,
    payload: bucketId,
  };
}

export function resetCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("totalPrice");
  return {
    type: CartActionTypes.RESET_CART,
  };
}
