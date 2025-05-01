'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedOut } from "@/lib/store/authSlice";
import api from "@/lib/axios/axios";
import { AxiosError } from "axios";


export default function LogoutPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function logout() {
            const controller = new AbortController();
            const signal = controller.signal;

            try {
                setLoading(true);
                const resp = await api.get('/users/logout');
                if (resp.status === 204) {
                    console.log("Logout Successful");
                }
            } catch (err) {
                const error = err as AxiosError;
                console.log(error.message);
            } finally {
                dispatch(setLoggedOut());
                setLoading(false);
                router.replace('/auth/login');
            }

            return () => controller.abort();
        }

        logout();
    }, []);

    return (
        <div>{loading ? 'Logging Out': ''}</div>
    )
}
