'use client';

import {useRouter} from "next/navigation";
import React, {ReactNode, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store/store";

export default function AuthGuard(Component: any) {
    return function ProtectedRoute(props: any) {
        const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
        const router = useRouter();
        const [shouldRender, setShouldRender] = useState(false);

        useEffect(() => {
            if (!loggedIn) {
                router.push("/auth/login");
            } else {
                setShouldRender(true);
            }
        }, []);
        return shouldRender ? <Component {...props} /> : null;
    }
}