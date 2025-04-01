import {configureStore} from "@reduxjs/toolkit";
import authSlice from "@/lib/store/authSlice";


export const store = configureStore({
    reducer: {
        loggedIn: authSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
