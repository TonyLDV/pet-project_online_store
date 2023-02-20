import axios from "axios";
import { Dispatch } from "redux";
import { LocalStorageKey, storage } from "../../LocaleStorage";
import { ShoesActionTypes } from "../types/shoes";
import { defaultShoes } from "../../constants";

export function fetchShoes() {
  return {
    type: ShoesActionTypes.FETCH_SHOES,
  };
}

export function setWish(id: number) {
  const cacheResult = storage.getItem(LocalStorageKey.SHOES);

  const shoes = cacheResult || defaultShoes;

  const newShoes = shoes.map((shoe: any) =>
    shoe.id === id
      ? {
          ...shoe,
          wish: !shoe.wish,
        }
      : shoe
  );

  localStorage.setItem("shoes", JSON.stringify(newShoes));
  return {
    type: ShoesActionTypes.FETCH_SHOES_WISH,
    payload: id,
  };
}

export function setSelected(id: number) {
  return {
    type: ShoesActionTypes.FETCH_SHOES_SELECTED,
    payload: id,
  };
}
