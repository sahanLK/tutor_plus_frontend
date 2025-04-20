import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "@/lib/store/authSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";


const persistConfig = {
    key: "auth",
    storage,
}

const authReducer = persistReducer(persistConfig, combineReducers({
    auth: authSlice,
}));

export const store = configureStore({
    reducer: authReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persister = persistStore(store);

store.subscribe(() => {
    console.log(store.getState());
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
