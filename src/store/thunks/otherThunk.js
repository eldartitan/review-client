import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_API_URL;

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
