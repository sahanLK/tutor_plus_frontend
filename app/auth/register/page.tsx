'use client';
import React, {useState} from "react";
import styles from "@/app/auth/login/page.module.css";
import SignInWithOAuth from "@/components/auth/SignInWithOAuth";
import {useRouter} from "next/navigation";


const RegisterPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        default_role: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    function handleStep(direction: string) {
        if (direction === "forward" && step >= 1) {
            setStep(step + 1);
        } else if (direction === "back" && step > 1) {
            setStep(step - 1);
        }
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Final Form Data:", formData);
        formData.default_role = "teacher";

        const response = await fetch("http://localhost:8000/users/register/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Registration Successful!");
            router.push("/auth/login");
        } else {
            alert("Error in registration!");
        }
    };

    function handleSignInWithOAuth(provider: string) {
        let url: string;
        if (provider == 'google') {
            url = 'http://localhost:8000/auth/google/redirect';
        } else {
            url = 'http://localhost:8000/auth/linkedin/redirect';
        }
        window.location.href = url;
    }

    function checkPassword(e) {
        console.log(e.target.value);
        if (formData.email !== e.target.value) {
            setError("Passwords don't match");
        }
    }

    return (
        <div className="w-full max-w-md bg-white mx-auto my-16 p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

            <div className="grid grid-cols-3 gap-1 mb-10 mt-10">
                <div className="h-[3px] bg-green-500"></div>
                <div className="h-[3px] bg-green-500"></div>
                <div className="h-[3px] bg-green-500"></div>
            </div>

            <form className="space-y-2" onSubmit={handleSubmit}>
                {/* Step 1: Email */}
                {step === 1 && (
                    <>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Email*</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        I'm a:
                        <select onSelect={handleChange}>
                            <option name="role">Teacher</option>
                            <option name="role">Student</option>
                        </select>
                    </>
                )}

                {/* Step 2: Username */}
                {step === 2 && (
                    <>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">First Name*</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                        <label className="block text-sm font-semibold text-gray-600 mb-1">Last Name*</label>
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </>
                )}

                {/* Step 3: Password & Submit */}
                {step === 3 && (
                    <>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Password*</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <label className="block text-sm font-semibold text-gray-600 mb-1">Confirm Password*</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="confirmPassword"
                            onChange={checkPassword}
                        />
                    </>
                )}

                {/*  Controls */}
                <div className="grid grid-cols-2 mt-8">

                    <div>
                        <button
                            type="button"
                            className="w-25 py-2 text-left mr-auto block rounded-sm cursor-pointer"
                            onClick={() => handleStep('back')}
                        >Previous
                        </button>
                    </div>
                    <div>
                        {step < 3 ? (
                            <button
                                type="button"
                                className="w-40 py-2 block ml-auto bg-blue-600 text-white rounded-sm cursor-pointer hover:bg-blue-700 transition"
                                onClick={() => handleStep('forward')}
                            >Next
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="w-40 py-2 block ml-auto bg-blue-600 text-white rounded-sm cursor-pointer hover:bg-blue-700 transition"
                                onClick={handleSubmit}
                            >Create Account
                            </button>
                        )}
                    </div>
                </div>
            </form>

            <div className={`${styles.separator} mb-6 mt-10`}>
                <span className="font-light text-xs">OR</span>
            </div>

            <SignInWithOAuth title="Continue with Google" provider="google"
                             redirect={() => handleSignInWithOAuth('google')}/>
            <SignInWithOAuth title="Continue with Linkedin" provider="linkedin"
                             redirect={() => handleSignInWithOAuth('linkedin')}/>
        </div>
    );
};

export default RegisterPage;
