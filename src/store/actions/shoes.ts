import { LocalStorageKey, storage } from "../../LocaleStorage";
import { ShoesAction, ShoesActionTypes } from "../types/shoes";
import { defaultShoes } from "../../constants";
import { Dispatch } from "redux";
import axios from "axios";

export function fetchShoes(
  type: string,
  limit: number = 8,
  page: number = 1,
  reset?: boolean
) {
  return async (dispatch: Dispatch<ShoesAction>) => {
    try {
      dispatch({
        type: ShoesActionTypes.SET_IS_LOADING,
        payload: true,
      });

      dispatch({
        type: ShoesActionTypes.FETCH_SHOES,
        payload: [],
      });

      const url = new URL("https://6431bdbb3adb1596517346ee.mockapi.io/shoes");

      let pagesCount = 0;

      if (type) {
        url.searchParams.append("filter", type);
        const response = await axios.get(url.href);
        pagesCount = response.data.length;
        url.searchParams.append("limit", JSON.stringify(limit));
        url.searchParams.append("page", JSON.stringify(page));
      }

      const response = await axios.get(url.href);

      if (reset) {
        dispatch({
          type: ShoesActionTypes.RESET_FILTER_PROPS,
          payload: response.data,
        });
      }

      dispatch({
        type: ShoesActionTypes.GET_SHOES_TYPE,
        payload: type,
      });

      dispatch({
        type: ShoesActionTypes.GET_SHOES_PAGES,
        payload: Math.ceil(pagesCount / limit),
      });

      dispatch({
        type: ShoesActionTypes.FETCH_SHOES_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: ShoesActionTypes.FETCH_SHOES_ERROR,
        payload: "ERROR",
      });
    } finally {
      dispatch({
        type: ShoesActionTypes.SET_IS_LOADING,
        payload: false,
      });
    }
  };
}

export function filterShoes(
  props: string,
  order: string,
  limit: number = 8,
  page: number = 1,
  type: string,
  option: string
) {
  return async (dispatch: Dispatch<ShoesAction>) => {
    const url = new URL("https://6431bdbb3adb1596517346ee.mockapi.io/shoes");
    url.searchParams.append("filter", type);
    url.searchParams.append("limit", JSON.stringify(limit));
    url.searchParams.append("page", JSON.stringify(page));
    url.searchParams.append("sortBy", props);
    url.searchParams.append("order", order);

    const response = await axios.get(url.href);

    const sortProps = { props: props, order: order, title: option };

    dispatch({
      type: ShoesActionTypes.GET_FILTER_PROPS,
      payload: sortProps,
    });

    dispatch({
      type: ShoesActionTypes.FETCH_SHOES_SUCCESS,
      payload: response.data,
    });
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

export function setShoesPage(page: number) {
  return { type: ShoesActionTypes.SET_SHOES_PAGE, payload: page };
}

export function setSelected(id: number) {
  return {
    type: ShoesActionTypes.FETCH_SHOES_SELECTED,
    payload: id,
  };
}
