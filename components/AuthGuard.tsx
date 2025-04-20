'use client';

import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store/store";


export default function AuthGuard<P extends object>(Component: React.ComponentType<P>) {
    return function ProtectedRoute(props: P) {
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
