'use client';

import { useEffect, useState } from "react";


function useFetch(url: string) {
    const [data, setData] = useState();
    const [status, setStatus] = useState(0);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const res = async () => {
            try {
                setIsLoading(true);
                const resp = await fetch(url)
                setStatus(resp.status);
                console.log(resp);
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
    });
}