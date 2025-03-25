'use client';
import styles from "./page.module.css";
import SignInWithOAuth from "@/components/auth/SignInWithOAuth";
import {useState} from "react";
import React from "react";


export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/users/login/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login successful:", data);

            } else {
                console.log("Login failed:", data.message);
            }
        } catch (e) {
            console.log(e)
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
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white    p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

                <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >Sign In
                    </button>
                </form>

                <div className={`${styles.separator} mb-6`}>
                    <span className="font-light text-xs">OR</span>
                </div>

                <div className="">
                    <SignInWithOAuth title="Continue with Google" provider="google" redirect={() => handleSignInWithOAuth('google')} />
                    <SignInWithOAuth title="Continue with Linkedin" provider="linkedin" redirect={() => handleSignInWithOAuth('linkedin')} />
                </div>
            </div>
        </div>
    );
}
