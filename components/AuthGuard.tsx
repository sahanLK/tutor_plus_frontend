'use client';

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

export default function AuthGuard(Component: React.ComponentType) {
    return function ProtectedRoute(props: any) {
        const loggedIn = useSelector((state: RootState) => state.auth.token);
        const router = useRouter();
        const [shouldRender, setShouldRender] = useState(false);

        useEffect(() => {
            if (!loggedIn) {
                router.push("/auth/login");
            } else {
                setShouldRender(true);
            }
        }, [loggedIn]);

        return shouldRender ? <Component {...props} /> : null;
    }
}
