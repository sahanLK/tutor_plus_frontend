'use client';

import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function Token() {
    const searchParams = useSearchParams();
    const authorizationCode = searchParams.get('auth');
    const state = searchParams.get('state');

    useEffect(() => {
        fetch('http://localhost:8000/auth/google/auth/exchange', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                auth_code: authorizationCode,
                state: state,
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
        });
    }, [authorizationCode, state]);

}