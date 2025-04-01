'use client';

import {useRouter} from "next/navigation";
import {ReactNode, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store/store";

export default function AuthGuard({children}: {children: ReactNode}) {
    const loggedIn = useSelector((state: RootState) => state.loggedIn).loggedIn;
    const router = useRouter();

    useEffect(() => {
        if (!loggedIn) {
            router.push("/auth/login");
        }
    }, []);
    return children;
}