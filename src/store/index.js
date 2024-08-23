import { configureStore } from "@reduxjs/toolkit";
import componentSlice from "./slices/componentSlice";

const store = configureStore({
  reducer: {
    component: componentSlice.reducer,
  },
});

export default store