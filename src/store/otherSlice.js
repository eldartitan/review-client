import { createSlice } from "@reduxjs/toolkit";
import {
  getCategories,
  getTags,
  getComments,
  productRating,
  getProducts,
  postComment,
} from "./thunks/otherThunk.js";
import { isError, loadFalseErrNull, pending } from "./utils.js";

const initialState = {
  error: null,
  loading: null,
  products: [],
  product: null,
  categories: [],
  comments: [],
  tags: [],
};

export const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    cleanComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => pending(state))
      .addCase(getProducts.fulfilled, (state, action) => {
        loadFalseErrNull(state);
        if (Array.isArray(action.payload)) state.products = action.payload;
        else state.product = action.payload;
      })
      .addCase(productRating.pending, (state) => pending(state))
      .addCase(productRating.fulfilled, (state, action) => {
        loadFalseErrNull(state);
        state.product = action.payload;
      })
      .addCase(getCategories.pending, (state) => pending(state))
      .addCase(getCategories.fulfilled, (state, action) => {
        loadFalseErrNull(state);
        state.categories = action.payload;
      })
      .addCase(getTags.pending, (state) => pending(state))
      .addCase(getTags.fulfilled, (state, action) => {
        loadFalseErrNull(state);
        state.tags = action.payload;
      })
      .addCase(getComments.pending, (state) => pending(state))
      .addCase(getComments.fulfilled, (state, action) => {
        loadFalseErrNull(state);
        state.comments = action.payload;
      })
      .addMatcher(isError, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default otherSlice.reducer;
