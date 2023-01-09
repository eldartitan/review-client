import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import reviewReducer from "./reviewSlice.js";
import otherReducer from "./otherSlice.js";

export const store = configureStore({
  reducer: {
    user: authReducer,
    review: reviewReducer,
    other: otherReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({ serializableCheck: false }),
});
