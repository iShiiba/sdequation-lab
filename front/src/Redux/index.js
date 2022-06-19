import { configureStore } from "@reduxjs/toolkit";
import  AuthSlice  from "./AuthSlice";
import RegisterSlice from "./RegisterSlice";

export const store = configureStore({
  reducer: {
      auth: AuthSlice,
      register: RegisterSlice

  },
});