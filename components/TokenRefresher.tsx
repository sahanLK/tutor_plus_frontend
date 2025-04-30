'use client';

import { setLoggedIn } from "@/lib/store/authSlice";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function TokenRefresher() {
    const router = useRouter();

    useEffect(() => {
        async function refreshToken() {
            try {
                const {data} = await axios.get('http://localhost:8000/users/refresh-token', {withCredentials: true});
                setLoggedIn({access_token: data.access_token});
                router.push('/dashboard');
            } catch (err) {
                const error = err as AxiosError;
                console.log(error.message)
            }
        }

        refreshToken();
    }, []);

    return null;
}
