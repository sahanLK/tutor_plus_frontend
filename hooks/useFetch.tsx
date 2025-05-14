'use client';

import api from "@/lib/axios/axios";
import { useEffect, useState } from "react";


function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>();
    const [statusCode, setStatusCode] = useState(0);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const resp = await api.get(url);
                const data = await resp.data
                setData(data);
                
                setStatusCode(resp.status);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(`Unknown error: ${err}`);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return {data, error, loading};
}

export default useFetch;