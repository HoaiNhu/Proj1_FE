import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlide";
import userReducer from "./slides/userSlide";
import statusReducer from "./slides/statusSlide";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    status: statusReducer,
  },
});
