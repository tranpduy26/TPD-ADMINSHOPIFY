import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request, requestAuth } from "../../services/axiosClient";
import { message } from "antd";
import localStorageService from "../../services/localStoreService";

/** State **/
const initialState = {
  accessToken: null,
  isfetching: false,
  error: false,
  message: "",
  isLoggedIn: !!localStorageService.get("accessToken"),
};

// //LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      const res = await request.post("/api/login", user);
      localStorageService.set("accessToken", res.data.token);
      return res.data;
    } catch (error) {
      message.error(error.response.data.message);

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const res = await requestAuth.post("/api/logout", "");
    localStorageService.remove("accessToken");
    message.success("logout success");
    return res.data;
  } catch (error) {
    message.error(error.response.data.message);
    return error.data;
  }
});
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user) => {
    try {
      const res = await request.post("/api/register", user);
      message.success("register new account success");
      return res;
    } catch (error) {
      message.error(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        isfetching: false,
        error: false,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
          isfetching: true,
        };
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isfetching: false,
          accessToken: payload.token,
          isLoggedIn: !!payload,
          message: "",
        };
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        return {
          ...state,
          isfetching: false,
          message: payload.message,
        };
      })
      .addCase(logoutUser.pending, (state) => {
        return {
          ...state,
          isfetching: true,
        };
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          accessToken: null,
          isfetching: false,
          isLoggedIn: !!payload,
        };
      })
      .addCase(registerUser.pending, (state) => {
        return {
          ...state,
          isfetching: true,
        };
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          accessToken: null,
          isfetching: false,
        };
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
