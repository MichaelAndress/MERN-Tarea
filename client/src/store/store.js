import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { taskSlice } from "./auth/taskSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        task: taskSlice.reducer,
    }
})