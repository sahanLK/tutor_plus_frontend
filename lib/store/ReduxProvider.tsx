"use client"; // This component must run on the client side

import { Provider } from "react-redux";
import { store } from "./store";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
