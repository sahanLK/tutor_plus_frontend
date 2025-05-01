'use client';

import { setLoggedIn, setLoggedOut } from "@/lib/store/authSlice";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppDispatch, store } from "@/lib/store/store";
import { useDispatch } from "react-redux";


export default function TokenRefresher() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        async function refreshToken() {
            try {
                const {data} = await axios.get('http://localhost:8000/users/refresh-token', {withCredentials: true});
                dispatch(setLoggedIn({access_token: data.access_token}));
            } catch (err) {
                dispatch(setLoggedOut());
                router.push('/auth/login');
                const error = err as AxiosError;
            }
        }

        refreshToken();
    }, []);

    return null;
}
