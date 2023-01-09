import { createSlice } from "@reduxjs/toolkit";
import {
  getReviews,
  likeReview,
  removeLikeReview,
  postReview,
} from "./thunks/reviewThunk.js";
import { isError, like, loadFalseErrNull, pending } from "./utils.js";

const initialState = {
  error: null,
  loading: null,
  reviews: [],
  review: null,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    cleanComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => pending(state))
      .addCase(getReviews.fulfilled, (state, action) => {
        loadFalseErrNull(state);
        if (Array.isArray(action.payload)) state.reviews = action.payload;
        else state.review = action.payload;
      })
      .addCase(postReview.pending, (state) => pending(state))
      .addCase(postReview.fulfilled, (state, action) => {
        loadFalseErrNull(state);
      })
      .addCase(likeReview.pending, (state) => pending(state))
      .addCase(likeReview.fulfilled, (state, action) => {
        loadFalseErrNull(state);
        like(state, action);
      })
      .addCase(removeLikeReview.pending, (state) => pending(state))
      .addCase(removeLikeReview.fulfilled, (state, action) => {
        loadFalseErrNull(state);
        like(state, action);
      })
      .addMatcher(isError, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default reviewSlice.reducer;
