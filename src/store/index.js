import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import reviewReducer from "./reviewSlice.js";

export const store = configureStore({
  reducer: {
    user: authReducer,
    review: reviewReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({ serializableCheck: false }),
});
