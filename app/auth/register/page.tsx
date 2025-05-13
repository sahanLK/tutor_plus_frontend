'use client';

import React, { useState } from "react";
import styles from "@/app/auth/login/page.module.css";
import SignInWithOAuth from "@/components/auth/SignInWithOAuth";
import { useRouter } from "next/navigation";
import { API_ROOT } from "@/config";
import Spinner from "@/components/spinner/Spinner";
import { motion, Variants } from "framer-motion";


const RegisterPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formError, setFormError] = useState<string | null>(null);
    const maxFormSteps = 3;
    const [formData, setFormData] = useState({
        email: "",
        default_role: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
    });
    const [loading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setFormData(prev => {
            const updated = { ...prev, default_role: e.target.value };
            return updated;
        });
    }

    function handleValidation() {
        if (step === 1) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(formData.email)) {
                setFormError(null);
                setFormError("Please enter a valid email");
                return;
            }
            if (formData.default_role.trim() == "" || formData.default_role.trim() == "Select") {
                setFormError("Please Select your role.");
                return;
            }
            setFormError(null);
            setDirection(1);
            setStep(2);

        } else if (step === 2) {
            if (formData.first_name.length <= 1 || formData.last_name.length <= 1) {
                setFormError("Please enter a valid name");
                return
            }
            setFormError(null);
            setDirection(1);
            setStep(3);
        }
    }

    function validatePassword() {
        if (formData.password.length < 8) {
            setFormError("Password should contain at least 8 characters");
            return false;
        }
        if (formData.password != formData.confirmPassword) {
            setFormError("Passwords do not match");
            return false;
        }
        setFormError(null);
        return true;
    }

    async function handleSubmit() {
        const isValid = validatePassword();
        if (!isValid) return;

        if (formError) return;
        formData.default_role = formData.default_role.toLowerCase();

        try {
            setIsLoading(true);
            const resp = await fetch(`${API_ROOT}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (resp.status == 201) {
                router.push('/auth/login');
                return;
            }

            const data = await resp.json();
            if ('detail' in data) {
                setFormError(data['detail']);
                return;
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setFormError(err.message);
            } else {
                setFormError(`Unknown error occured: ${err}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    function handleSignInWithOAuth(provider: string) {
        let url: string;
        if (provider == 'google') {
            url = 'http://localhost:8000/api/auth/google/redirect';
        } else {
            url = '/api/auth/linkedin/redirect';
        }
        window.location.href = url;
    }


    const variants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : 0,
            opacity: 0,
            position: 'absolute',
        }),
        center: {
            x: 0,
            opacity: 1,
            position: 'relative',
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            position: 'absolute',
        }),
    };
    const [direction, setDirection] = useState(1);

    function goBack() {
        setDirection(-1);
        setStep(step === 1 ? 1 : step - 1);
    }

    return (
        <div className="w-full max-w-md bg-white mx-auto my-16 p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-10 text-center text-stone-800">Create an Account</h2>
            <span className="text-red-500">{formError}</span>

            <form className="space-y-2 mt-8" onSubmit={handleSubmit}>
                {/* Step 1: Email */}
                {step === 1 && (
                    <motion.div
                        key={step}
                        variants={variants}
                        custom={direction}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="w-full"
                    >
                        <label className="block text-sm font-semibold text-gray-600 mb-1" htmlFor="email">Email*</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 text-stone-700"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <div className="mt-3">
                            <label className="text-stone-700">Your Role: </label>
                            <select
                                value={formData.default_role}
                                onChange={handleRoleChange}
                                className="ml-4 py-3 px-4 border-1 border-stone-400 text-stone-700 rounded"
                            >
                                <option value="Select" defaultChecked={true}>Select</option>
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                            </select>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Name */}
                {step === 2 && (
                    <motion.div
                        key={step}
                        variants={variants}
                        custom={direction}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="w-full"
                    >
                        <label className="block text-sm font-semibold text-gray-600 mb-1">First Name*</label>
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            className="w-full px-3 py-2 border mb-5 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label className="block text-sm font-semibold text-gray-600 mb-1">Last Name*</label>
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </motion.div>
                )}

                {/* Step 3: Password & Submit */}
                {step === 3 && (
                    <motion.div
                        key={step}
                        variants={variants}
                        custom={direction}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="w-full"
                    >
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Password*</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <label className="block text-sm font-semibold text-gray-600 mb-1 mt-6">Confirm Password*</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="confirmPassword"
                            onChange={handleChange}
                        />
                    </motion.div>
                )}

                {/*  Controls */}
                <div className="grid grid-cols-2 mt-10">
                    <div>
                        <button
                            type="button"
                            className="w-25 py-2 text-left mr-auto block rounded-sm cursor-pointer"
                            onClick={goBack}
                        >Previous
                        </button>
                    </div>
                    <div>
                        {step === maxFormSteps ? <button
                            type="button"
                            className={`w-40 h-10 py-2 block ml-auto ${loading ? 'bg-blue-500' : 'bg-blue-600'} text-white rounded-sm cursor-pointer ${!loading ? 'hover:bg-blue-700' : ''} transition`}
                            onClick={handleSubmit}
                            disabled={loading}
                        >{loading ? <Spinner size={5} color="white" /> : 'Create Account'}
                        </button> : <button
                            type="button"
                            className="w-40 h-10 py-2 block ml-auto bg-blue-600 text-white rounded-sm cursor-pointer hover:bg-blue-700 transition"
                            onClick={handleValidation}
                        >Next
                        </button>}

                    </div>
                </div>
            </form>

            <div className={`${styles.separator} mb-6 mt-10`}>
                <span className="font-light text-xs">OR</span>
            </div>

            <SignInWithOAuth title="Continue with Google" provider="google"
                redirect={() => handleSignInWithOAuth('google')} />
            <SignInWithOAuth title="Continue with Linkedin" provider="linkedin"
                redirect={() => handleSignInWithOAuth('linkedin')} />
        </div>
    );
};

export default RegisterPage;
