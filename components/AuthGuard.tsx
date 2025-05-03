'use client';

// import {useRouter} from "next/navigation";
import React, {ComponentType, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store/store";
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;

export default function AuthGuard<P extends IntrinsicAttributes>(Component: ComponentType<P>) {
    return function ProtectedRoute(props: P) {
        const loggedIn = useSelector((state: RootState) => state.auth.token);
        // const router = useRouter();
        const [shouldRender, setShouldRender] = useState(false);


        useEffect(() => {
            if (!loggedIn) {
                console.log("User not logged in: ", loggedIn);
                // router.push("/auth/login");
            } else {
                console.log("User Logged In: ", loggedIn)
                setShouldRender(true);
            }
        }, []);

        return shouldRender ? <Component {...props} /> : null;
    }
}
    