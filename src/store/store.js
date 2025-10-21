import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../features/searchSlice/searchSlice";
import chatSlice from "../features/chatSlice/chatSlice";
import themeSlice from "../features/themeSlice/themeSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    chat: chatSlice,
    theme: themeSlice,
  },
});
