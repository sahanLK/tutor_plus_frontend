'use client';
import styles from "./page.module.css";
import SignInWithOAuth from "@/components/auth/SignInWithOAuth";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {setLoggedIn} from "@/lib/store/authSlice";
import {useDispatch} from "react-redux";

export default function LoginPage() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/users/login/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Invalid Credentials");
            }

            const data = await response.json();
            console.log(data);
            localStorage.setItem('access_token', data.access_token);
            dispatch(setLoggedIn());
            router.push('/dashboard');

        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('Unknown error');
            }
        } finally {
            setLoading(false);
        }
    }

    function handleSignInWithOAuth(provider: string) {
        let url: string;
        if (provider == 'google') {
            url = 'http://localhost:8000/auth/google/redirect';
        } else {
            url = 'http://localhost:8000/auth/linkedin/redirect';
        }
        window.location.href = url;
    }

    return (
        <div className="w-full max-w-md bg-white mx-auto p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-10">Sign In</h2>

            {error !== '' ? <>{error}</>: ''}

            <form className="space-y-3 mb-8" onSubmit={handleSubmit}>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Email*</label>
                <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label className="block text-sm font-semibold text-gray-600 mb-1">Password*</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className={`${loading ? 'bg-gray-300': 'bg-blue-600 hover:bg-blue-700'} w-full py-2 mt-4 mb-2 text-white transition rounded-sm cursor-pointer `}
                    disabled={loading}
                >Sign In
                </button>
            </form>

            <div className={`${styles.separator} mb-6`}><span className="font-light text-xs">OR</span></div>
            <SignInWithOAuth title="Continue with Google" provider="google" redirect={() => handleSignInWithOAuth('google')}/>
            <SignInWithOAuth title="Continue with Linkedin" provider="linkedin" redirect={() => handleSignInWithOAuth('linkedin')}/>
        </div>
    );
}
