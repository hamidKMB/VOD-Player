import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./Player/playerSlice";

const store = configureStore({
  reducer: {
    playerReducer,
  },
});

export default store;
