'use client';
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store/store";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Redirector<P extends object>(Component: React.ComponentType<P>) {
    return function DashboardDirector(props: P) {
        const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
        const router = useRouter();
        const [shouldRender, setShouldRender] = useState(false);

        useEffect(() => {
            if (loggedIn) {
                router.replace("/dashboard");  // Use replace() to avoid back button issues
            } else {
                setShouldRender(true);  // Only render if user is NOT logged in
            }
        }, [loggedIn]);

        return shouldRender ? <Component {...props} /> : null;
    };
}
