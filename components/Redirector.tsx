'use client';
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store/store";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Redirector(Component: any) {
    return function DashboardDirector(props: any) {
        const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
        const router = useRouter();
        const [shouldRender, setShouldRender] = useState(false);

        useEffect(() => {
            if (loggedIn) {
                router.replace("/dashboard");  // Use replace() to avoid back button issues
            } else {
                setShouldRender(true);  // Only render if profile is NOT logged in
            }
        }, [loggedIn]);

        return shouldRender ? <Component {...props} /> : null;
    };
}
