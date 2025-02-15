import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/ApiSlices";

const store = configureStore({
    reducer: {
        authSlice,
    },
});

export default store;