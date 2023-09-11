import axios from "axios";
import { ShoesType } from "../../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { newShoesUrl } from "../../services/web-backend";
import { IShoes } from "../../store/types/shoes";
import { shoesActions } from "../slices/shoesSlice";

export const fetchShoesToolkit = createAsyncThunk(
  "shoes/fetchShoes",
  async () => {
    try {
      const { data } = await axios.get<IShoes[]>(newShoesUrl);

      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchShoesToolkitByQuery = createAsyncThunk(
  "shoes/fetchShoesByType",
  async (
    {
      type,
      page = 1,
      limit = 8,
      sortingProps,
      reset = false,
      update = false,
      title = "",
    }: {
      type?: ShoesType;
      page?: number;
      limit?: number;
      sortingProps?: { props: string; order: string; title: string };
      reset?: boolean;
      update?: boolean;
      title?: string;
    },
    { dispatch }
  ) => {
    try {
      const url = new URL(newShoesUrl);

      type && url.searchParams.append("type", type);

      if (title.length <= 3) {
        if (title.length == 0) {
          const response = await axios.get(url.href);
          dispatch(shoesActions.getMaxItems(response.data.length));
          dispatch(
            shoesActions.getPagesCount(Math.ceil(response.data.length / limit))
          );
        }

        url.searchParams.append("_limit", JSON.stringify(limit));
        url.searchParams.append("_page", JSON.stringify(page));

        if (sortingProps) {
          url.searchParams.append("_sort", sortingProps.props);
          url.searchParams.append("_order", sortingProps.order);

          const sortProps = {
            props: sortingProps.props,
            order: sortingProps.order,
            title: sortingProps.title,
          };
          dispatch(shoesActions.getSortProps(sortProps));
        }

        if (reset) {
          dispatch(shoesActions.resetSortProps());
          dispatch(shoesActions.setShoesPage(1));
        }
        if (title.length > 3) {
          url.searchParams.append("title", title);
        }

        const { data } = await axios.get<IShoes[]>(url.href);

        return data;
      }

      if (title.length > 3) {
        url.searchParams.append("title_like", title);
        const response = await axios.get<IShoes[]>(url.href);

        dispatch(shoesActions.getMaxItems(response.data.length));
        dispatch(
          shoesActions.getPagesCount(Math.ceil(response.data.length / limit))
        );

        if (sortingProps) {
          url.searchParams.append("_sort", sortingProps.props);
          url.searchParams.append("_order", sortingProps.order);

          const sortProps = {
            props: sortingProps.props,
            order: sortingProps.order,
            title: sortingProps.title,
          };
          dispatch(shoesActions.getSortProps(sortProps));
        }

        if (reset) {
          dispatch(shoesActions.resetSortProps());
          dispatch(shoesActions.setShoesPage(1));
        }
        url.searchParams.append("_page", JSON.stringify(page));
        url.searchParams.append("_limit", JSON.stringify(limit));
        const { data } = await axios.get<IShoes[]>(url.href);

        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchSingleShoes = createAsyncThunk(
  "shoes/fetchSingleShoes",
  async (id: number, { dispatch }) => {
    try {
      const url = new URL(newShoesUrl);
      const { data } = await axios.get<IShoes>(`${url.href}/${id}`);

      return data;
    } catch (e) {
      console.log(e);
    }
  }
);
