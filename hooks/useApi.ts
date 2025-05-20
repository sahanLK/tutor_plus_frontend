'use client';

import api from "@/lib/axios/axios";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

type HttpMethod = "GET" | "POST";

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

function useApi<T, R>(url: string, method: HttpMethod = "GET", autoFetch: boolean = true, reqBody: R | null = null): {
    response: T | null;
    loading: boolean;
    error: string | null;
    statusCode: number;
    fetchData: (url?: string, postData?: R) => Promise<void>;
} {
    const [response, setResponse] = useState<T | null>(null);
    const [statusCode, setStatusCode] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (fetchUrl?: string, postData: R | null = null) => {
        const targetUrl = fetchUrl || url;
        const requestBody = postData || reqBody;
        if (!targetUrl) return;

        setLoading(true);
        try {
            let resp;
            if (method == 'GET') {
                resp = await api.get<T>(url);
            }
            if (method == 'POST') {
                resp = await api.post<T>(url, requestBody);
            }
            if (!resp) return;

            setResponse(resp.data);
            setStatusCode(resp.status);
            setError(null);
        } catch (err: unknown) {
            if (err && typeof err === "object" && "isAxiosError" in err) {
                const axiosError = err as AxiosError;
                setStatusCode(axiosError.response?.status || 0);
                setError(axiosError.message);
            } else if (err instanceof Error) {
                setError(err.message);
                setStatusCode(0);
            } else {
                setError(`Unknown error: ${err}`);
                setStatusCode(0);
            }
        } finally {
            setLoading(false);
        }
    }, [url])

    useEffect(() => {
        if (autoFetch && url) {
            fetchData();
        }
    }, [url, autoFetch, fetchData]);

    return { response, error, loading, statusCode, fetchData };
}

export default useApi;
