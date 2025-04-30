'use client';

import { RootState } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export default function Redirector() {
    const router = useRouter();
    const loggedIn = useSelector((state: RootState) => state.auth.token ? true : false);

    useEffect(() => {
        if (loggedIn) {
            router.replace('/dashboard');
        }
    }, [loggedIn]);

    return null;
}
