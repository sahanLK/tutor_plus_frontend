import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "@/lib/store/authSlice";
import configSlice from "@/lib/store/UiConfigSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";


const persistConfig = {
    key: "auth",
    storage,
}

const persistentReducer = persistReducer(persistConfig, configSlice);

const rootReducer = combineReducers({
    auth: authSlice,
    config: persistentReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
