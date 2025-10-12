import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../features/searchSlice/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
  },
});
