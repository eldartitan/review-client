import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001";

export const getReviews = createAsyncThunk(
  "review/getReviews",
  async function (data, { rejectWithValue }) {
    try {
      console.log(data, "PARAMS");
      let params;
      if (data.sort === "rated") params = { user_rating: -1 };
      else if (data.sort === "upload") params = { _id: -1 };

      const response = await axios
        .get(`${API_URL}/api/reviews`, {
          params: {
            id: data?.id,
            params,
            tags: data.tags,
            category: data.category,
          },
        })
        .then((res) => res);
      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      console.log(response, "response");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProducts = createAsyncThunk(
  "review/getProducts",
  async function (data, { rejectWithValue }) {
    try {
      console.log(data, "GET PRODUCTS DATA");
      const response = await axios
        .get(`${API_URL}/api/products/${data ? data.id : ""}`)
        .then((res) => res);
      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCategories = createAsyncThunk(
  "review/getCategories",
  async function (data, { rejectWithValue }) {
    try {
      const response = await axios
        .get(`${API_URL}/api/other/categories`, { params: { id: data?.id } })
        .then((res) => res);
      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTags = createAsyncThunk(
  "review/getTags",
  async function (data, { rejectWithValue }) {
    try {
      const response = await axios
        .get(`${API_URL}/api/other/tags`, { params: { id: data?.id } })
        .then((res) => res);
      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getComments = createAsyncThunk(
  "review/getComments",
  async function (data, { rejectWithValue }) {
    try {
      const response = await axios
        .get(`${API_URL}/api/comments/${data?.id}`, {
          withCredentials: true,
        })
        .then((res) => res);
      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postComment = createAsyncThunk(
  "review/postComment",
  async function (data, { rejectWithValue }) {
    try {
      const response = await axios
        .post(`${API_URL}/api/comments/create`, data, {
          withCredentials: true,
        })
        .then((res) => res);
      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postReview = createAsyncThunk(
  "review/postReview",
  async function (data, { rejectWithValue }) {
    try {
      const response = await axios
        .post(`${API_URL}/api/reviews/create`, data, {
          withCredentials: true,
        })
        .then((res) => res);
      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const likeReview = createAsyncThunk(
  "review/likeReview",
  async function (data, { rejectWithValue }) {
    try {
      const response = await axios
        .post(`${API_URL}/api/reviews/like`, data, {
          withCredentials: true,
        })
        .then((res) => res);
      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const removeLikeReview = createAsyncThunk(
  "review/removeLikeReview",
  async function (data, { rejectWithValue }) {
    try {
      const response = await axios
        .post(`${API_URL}/api/reviews/dislike`, data, {
          withCredentials: true,
        })
        .then((res) => res);
      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const productRating = createAsyncThunk(
  "review/productRating",
  async function (data, { rejectWithValue }) {
    try {
      const response = await axios
        .post(`${API_URL}/api/products/rating`, data, {
          withCredentials: true,
        })
        .then((res) => res);
      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  error: null,
  loading: null,
  reviews: [],
  review: null,
  products: [],
  product: null,
  categories: [],
  comments: [],
  tags: [],
};

function isError(action) {
  return action.type.endsWith("rejected");
}

function pending(state) {
  state.loading = true;
  state.error = null;
}

function loadFalseErrNull(state) {
  state.loading = false;
  state.error = null;
}

function like(state, action) {
  console.log(action.payload);
  if (state.review?._id === action.payload._id) {
    state.review.likes = action.payload.likes;
  }
  const id = state.reviews.findIndex((f) => f._id === action.payload._id);
  state.reviews[id].likes = action.payload.likes;
}

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
      .addCase(getProducts.pending, (state) => pending(state))
      .addCase(getProducts.fulfilled, (state, action) => {
        loadFalseErrNull(state);
        if (Array.isArray(action.payload)) state.products = action.payload;
        else state.product = action.payload;
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
      .addCase(productRating.pending, (state) => pending(state))
      .addCase(productRating.fulfilled, (state, action) => {
        loadFalseErrNull(state);
      })
      .addMatcher(isError, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
// export const {increment, decrement, incrementByAmount} = reviewSlice.actions;

export default reviewSlice.reducer;
