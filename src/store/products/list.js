import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestAuth } from "../../services/axiosClient";
import queryString from "query-string";
import { message } from "antd";
/** State **/
const initialState = {
  allProduct: null,
  isfetching: false,
  error: false,
  listProductType: null,
  pageInfor: null,
};

export const getProductList = createAsyncThunk(
  "product/list",
  async (params) => {
    const paramString = queryString.stringify(params);
    try {
      const res = await requestAuth.get(`/api/products?${paramString}`);
      return res;
    } catch (error) {
      message.error(error.response.data.message);
    }
  }
);
export const getProductType = createAsyncThunk(
  "product/productType",
  async () => {
    try {
      const res = await requestAuth.get("/api/product-types");
      return res;
    } catch (error) {
      message.error(error.response.data.message);
    }
  }
);

const listProductSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        allProduct: [],
        pageInfor: "",
        isfetching: false,
        error: false,
      };
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getProductList.pending, (state) => {
        return {
          ...state,
          pageInfor: "",
          allProduct: null,
          isfetching: true,
        };
      })
      .addCase(getProductList.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isfetching: false,
          allProduct: payload.products,
          pageInfor: payload.page_info,
        };
      })
      .addCase(getProductType.pending, (state) => {
        return {
          ...state,
          isfetching: true,
        };
      })
      .addCase(getProductType.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isfetching: false,
          listProductType: payload,
        };
      });
  },
});

export const { reset } = listProductSlice.actions;
export default listProductSlice.reducer;
