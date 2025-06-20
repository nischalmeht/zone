import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/saleSlice";


export const store = configureStore({
  reducer: {
    sale: userReducer,
    
  },
});