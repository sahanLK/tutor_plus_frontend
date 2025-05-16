'use client';

import api from "@/lib/axios/axios";
import { useEffect, useState } from "react";

/**
 * useApi - Generic API caller with Axios.
 * Automatically handles token refresh and retries.
 *
 * @template T - Expected response data type.
 * @param {string} url - The backend URL to fetch data from.
 * @returns {{
 *   response: T | null,
 *   loading: boolean,
 *   error: Error | string | null,
 *   statusCode: number
 * }}
 */
function useApi<T>(url: string): {
    response: T | null;
    loading: boolean;
    error: Error | string | null;
    statusCode: number;
} {
    const [response, setResponse] = useState<T | null>(null);
    const [statusCode, setStatusCode] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const resp = await api.get<T>(url);
                setResponse(resp.data);
                setStatusCode(resp.status);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(`Unknown error: ${err}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { response, error, loading, statusCode };
}

export default useApi;
