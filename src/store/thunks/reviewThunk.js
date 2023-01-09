import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_API_URL;

export const getReviews = createAsyncThunk(
  "review/getReviews",
  async function (data, { rejectWithValue }) {
    try {
      console.log(data, "PARAMS");
      let params;
      if (data?.sort === "rated") params = { user_rating: -1 };
      else if (data?.sort === "upload") params = { _id: -1 };

      const response = await axios
        .get(`${API_URL}/api/reviews`, {
          params: {
            id: data?.id,
            params,
            tags: data?.tags,
            category: data?.category,
            text: data?.text,
            user_id: data?.user_id,
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
