import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./reducers/userInfo";
import productsSlice from "./reducers/products";

const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    products: productsSlice,
  },
});

export default store;
