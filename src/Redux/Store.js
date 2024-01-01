import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slicer/ProductSlice";
import globalSlice from "./Slicer/GlobalSlice";

const store = configureStore({

  reducer: {
    Product: productSlice,
    search: globalSlice,
    price: globalSlice,
  }
})
export default store
