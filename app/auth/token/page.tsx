'use client';

import { API_ROOT } from "@/config";
import { setLoggedIn } from "@/lib/store/authSlice";
import { setActiveRole } from "@/lib/store/UiConfigSlice";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Token() {
    const searchParams = useSearchParams();
    const authorizationCode = searchParams.get('auth');
    const state = searchParams.get('state');
    const provider = searchParams.get('provider');
    const router = useRouter();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchAuthData() {
            if (!authorizationCode || !state || !provider) return;
            setLoading(true);

            try {
                const requestBody = JSON.stringify({ auth_code: authorizationCode, state: state });
                const resp = await axios.post(`${API_ROOT}/api/auth/${provider}/auth/exchange`, requestBody, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });

                if (resp.status === 200) {
                    const data = await resp.data;

                    dispatch(setActiveRole({ activeRole: data.active_role }));
                    dispatch(setLoggedIn({ access_token: data.access_token }));
                    router.push('/dashboard');
                }
            } catch (err) {
                const error = err as AxiosError;
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchAuthData();
    }, [authorizationCode, state]);

    return (
        <div>
            {loading ? "Loading" : "Logged In"}
        </div>
    )

}
