"use client";

import { Provider } from "react-redux";
import {persister, store} from "./store";
import {PersistGate} from "redux-persist/integration/react";
import React from "react";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persister}>{children}</PersistGate>
        </Provider>);
}
