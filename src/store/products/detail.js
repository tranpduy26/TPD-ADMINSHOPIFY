import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {requestAuth } from "../../services/axiosClient";
import { message } from "antd";
/** State **/
const initialState = {
  productDetail: null,
  isfetching: false,
  error: false,
  price: null,
  activeTitle: null,
  message:null
  
};

export const getDetailProduct = createAsyncThunk(
  "product/detail",
  async (id) => {
    try {
      const res = await requestAuth.get(`/api/product/${id}`);
      return res;
    } catch (error) {
       message.error(error.response.data.message);
    }
  }
);

export const updateTitleProduct = createAsyncThunk(
  "product/updateTitleProduct",
  async ({ productID, title: info }) => {
    try {
      const res = await requestAuth.post(`/api/product/${productID}`, info);
      message.success(res.message);
      return res;
    } catch (error) {
       message.error(error.response.data.message);
    }
  }
);

export const updatePriceProductWithPercent = createAsyncThunk(
  "product/updateProductPriceWithPercent",
  async ({info}) => {
    try {
      const res = await requestAuth.post("/api/price-by-percent", info);
      message.success(res.message);
      return res;
    } catch (error) {
       message.error(error.response.data.message);
    }

  }
);


export const updatePriceProductWithAmount = createAsyncThunk(
  "product/updateProductPriceWithAmount",
  async ({info}) => {
    try {
      const res = await requestAuth.post("/api/price-by-amount", info);
      message.success(res.message);
      return res;
    } catch (error) {
       message.error(error.response.data.message);
    }
    
  }
);

export const removeTagsPorudct = createAsyncThunk(
  "product/removeTagsProduct",
  async(tags) => {
    
    try {
      const res = await requestAuth.post("/api/remove-tag",tags)
      message.success(res.message);
      return res;
    } catch (error) {
       message.error(error.response.data.message);
    }
  }
)
export const addTags = createAsyncThunk(
  "product/addTags",
  async (tags) => {
    try {
      const res = await requestAuth.post("/api/add-tag",tags)
      message.success(res.message);
      return res;
    } catch (error) {
       message.error(error.response.data.message);
    }
  }
)


const detailProductSlice = createSlice({
  name: "deatailProduct",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        isfetching: false,
        error: false,
      };
    },
    handleTitleClick: (state, { payload }) => {
      return{ ...state, price: payload.price, activeTitle: payload.id };
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getDetailProduct.pending, (state) => {
        return {
          ...state,
          isfetching: true,
        };
      })
      .addCase(getDetailProduct.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isfetching: false,
          price: payload.variants[0].price,
          activeTitle: payload.variants[0].id,
          productDetail: payload,
        };
      })
      .addCase(updateTitleProduct.pending, (state) => {
        return {
          ...state,
          isfetching: true,
          
        };
      })

      .addCase(updateTitleProduct.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isfetching: false,
          productDetail:payload.product
        };
      })
      .addCase(updatePriceProductWithAmount.pending, (state) => {
        return {
          ...state,
          isfetching: true,
        };
      })
      .addCase(updatePriceProductWithAmount.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isfetching: false,
          price:payload.new_price
        };
      })

      .addCase(updatePriceProductWithPercent.pending, (state) => {
        return {
          ...state,
          isfetching: true,
        };
      })
      .addCase(updatePriceProductWithPercent.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isfetching: false,
          price:payload.new_price          
        };
      })
      .addCase(removeTagsPorudct.pending, (state) => {
        return {
          ...state,
          isfetching: true,
        };
      })
      .addCase(removeTagsPorudct.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isfetching: false,
          message:payload.message
        };
      })
      .addCase(addTags.pending, (state) => {
        return {
          ...state,
          isfetching: true,
        };
      })
      .addCase(addTags.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isfetching: false,
          message:payload.message
        };
      })
      
  },
});

export const { reset, handleTitleClick,getImageURL } = detailProductSlice.actions;
export default detailProductSlice.reducer;
