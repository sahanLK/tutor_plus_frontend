'use client';
import React, { ReactEventHandler, useState } from "react";
import styles from "@/app/auth/login/page.module.css";
import SignInWithOAuth from "@/components/auth/SignInWithOAuth";
import { useRouter } from "next/navigation";


const RegisterPage = () => {
    const router = useRouter();
    // const [step, setStep] = useState(1);


    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');



    // function handleStep(direction: string) {
    //     if (direction === "forward" && step >= 1) {
    //         setStep(step + 1);
    //     } else if (direction === "back" && step > 1) {
    //         setStep(step - 1);
    //     }
    // }

    // Handle form submission
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log("Final Form Data:", formData);
    // //     formData.default_role = "teacher";

    //     const response = await fetch("http://localhost:8000/users/register/", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(formData),
    //     });

    //     if (response.ok) {
    //         alert("Registration Successful!");
    //         router.push("/auth/login");
    //     } else {
    //         alert("Error in registration!");
    //     }
    // };

    // function handleSignInWithOAuth(provider: string) {
    //     let url: string;
    //     if (provider == 'google') {
    //         url = 'http://localhost:8000/auth/google/redirect';
    //     } else {
    //         url = 'http://localhost:8000/auth/linkedin/redirect';
    //     }
    //     window.location.href = url;
    // }

    // function checkPassword(e) {
    //     console.log(e.target.value);
    //     if (formData.email !== e.target.value) {
    //         setError("Passwords don't match");
    //     }
    // }





    const [step, setStep] = useState(1);
    const [formError, setFormError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        defaultRole: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setFormData(prev => {
            const updated = { ...prev, defaultRole: e.target.value };
            console.log("New state:", updated);
            return updated;
        });
    }

    function validateEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(e.target.value)) {
            setFormError(null);
            setStep(step => step + 1);
            return true;
        } else {
            setFormError("Please enter a valid email");
        }
    }

    function validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length < 8) {
            setFormError("Password should contain at least 8 characters");
        }
        setFormError(null);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function confirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
        if (formData.password != e.target.value) {
            setFormError("Passwords do not match");
        }
        setFormError(null);
    }

    function handleStep(direction: "forward" | "backward") {
        if (direction == "forward") {
            if (!formError) {
                setStep(step => step + 1);
            }
            return;
        } else {
            setStep(step => step - 1);
        }
    }

    function handleSubmit() {
        console.log(formData);
        
    }

    return (
        <div className="w-full max-w-md bg-white mx-auto my-16 p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
            <span>{formError}</span>

            <form className="space-y-2" onSubmit={handleSubmit}>
                {/* Step 1: Email */}
                {step === 1 && (
                    <>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Email*</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                            name="email"
                            value={formData.email}
                            onChange={validateEmail}
                        />
                        I'm a:
                        <select value={formData.defaultRole} onChange={handleRoleChange} className="ml-4 py-2 px-4">
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
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
                            onChange={validatePassword}
                        />

                        <label className="block text-sm font-semibold text-gray-600 mb-1">Confirm Password*</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="confirmPassword"
                            onChange={confirmPassword}
                        />
                    </>
                )}

                {/*  Controls */}
                <div className="grid grid-cols-2 mt-8">

                    <div>
                        <button
                            type="button"
                            className="w-25 py-2 text-left mr-auto block rounded-sm cursor-pointer"
                            onClick={() => handleStep('backward')}
                        >Previous
                        </button>
                    </div>
                    <div>
                        {step < 3 ? (
                            <button
                                type="button"
                                className="w-40 py-2 block ml-auto bg-blue-600 text-white rounded-sm cursor-pointer hover:bg-blue-700 transition"
                                disabled={formError ? true: false}
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

            {/* <SignInWithOAuth title="Continue with Google" provider="google" redirect={() => handleSignInWithOAuth('google')} />
            <SignInWithOAuth title="Continue with Linkedin" provider="linkedin" redirect={() => handleSignInWithOAuth('linkedin')} /> */}
        </div>
    );
};

export default RegisterPage;
