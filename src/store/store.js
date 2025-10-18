import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../features/searchSlice/searchSlice";
import chatSlice from "../features/chatSlice/chatSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    chat: chatSlice,
  },
});
