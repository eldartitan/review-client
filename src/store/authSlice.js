import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isError } from "./utils.js";

const API_URL = import.meta.env.VITE_REACT_API_URL;

export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async function (_, { rejectWithValue }) {
    try {
      console.log("GOOGLE");
      const response = await axios
        .get(`${API_URL}/auth/google/success`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          return res;
        });
      if (response.status !== 200) {
        if (response.status === 401) throw new Error("Unauthorized");
        throw new Error("Server Error!");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginDiscord = createAsyncThunk(
  "auth/loginDiscord",
  async function (_, { rejectWithValue }) {
    try {
      console.log("GOOGLE");
      const response = await axios
        .get(`${API_URL}/auth/discord/success`, {
          withCredentials: true,
        })
        .then((res) => res);
      if (response.status !== 200) {
        throw new Error("Server Error!");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios
        .get(`${API_URL}/auth/google/logout`, {
          withCredentials: true,
        })
        .then((res) => res);
      if (response.status !== 200) throw new Error("Server Error!");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  error: null,
  loading: null,
  user: null,
};

function loadAndError(state, loading = false, error, user = null) {
  state.loading = loading;
  state.error = error;
  state.user = user;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    example: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginGoogle.pending, (state) => loadAndError(state, true, null))
      .addCase(loginGoogle.fulfilled, (state, action) => {
        loadAndError(state, false, null, action.payload);
      })
      .addCase(loginDiscord.pending, (state) => loadAndError(state, true, null))
      .addCase(loginDiscord.fulfilled, (state, action) => {
        loadAndError(state, false, null, action.payload);
      })
      .addCase(logout.pending, (state) => loadAndError(state, true, null))
      .addCase(logout.fulfilled, (state, action) => {
        loadAndError(state, false, null, null);
      })
      .addMatcher(isError, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// export const {increment, decrement, incrementByAmount} = reviewSlice.actions;

export default authSlice.reducer;
