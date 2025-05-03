'use client';
import React, {useState} from "react";
import styles from "@/app/auth/login/page.module.css";
import SignInWithOAuth from "@/components/auth/SignInWithOAuth";
import {useRouter} from "next/navigation";


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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    };

    function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setFormData(prev => {
            const updated = {...prev, default_role: e.target.value};
            console.log("New state:", updated);
            return updated;
        });
    }

    function handleValidation() {
        if (step === 1) {
            console.log("Validating Step 1")
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex.test(formData.email)) {
                setFormError(null);
                setStep(2);
            } else {
                setFormError("Please enter a valid email");
                return
            }

        } else if (step === 2) {
            console.log("Validating Step 2")
            if (formData.first_name.length <= 1 || formData.last_name.length <= 1) {
                setFormError("Please enter a valid name");
                return
            }
            setFormError(null);
            setStep(3);

        } else if (step === 3) {
            console.log("Validating Step 3")

        }
    }

    function validatePassword() {
        if (formData.password.length < 8) {
            setFormError("Password should contain at least 8 characters");
            return;
        }
        if (formData.password != formData.confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }
        setFormError(null);
    }

    function handleSubmit() {
        validatePassword();

        if (formError) return;
        formData.default_role = formData.default_role.toLowerCase();

        fetch('http://localhost:8000/users/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                router.push('/auth/login');
            })
            .catch(err => console.log(err))
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

    return (
        <div className="w-full max-w-md bg-white mx-auto my-16 p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
            <span>{formError}</span>

            <form className="space-y-2" onSubmit={handleSubmit}>
                {/* Step 1: Email */}
                {step === 1 && (
                    <>
                        <label className="block text-sm font-semibold text-gray-600 mb-1" htmlFor="email">Email*</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {/*I'm a:*/}
                        <select value={formData.default_role} onChange={handleRoleChange} className="ml-4 py-2 px-4">
                            <option value="Student" defaultChecked>Student</option>
                            <option value="Teacher">Teacher</option>
                        </select>
                    </>
                )}

                {/* Step 2: Name */}
                {step === 2 && (
                    <>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">First Name*</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            onChange={handleChange}
                        />
                    </>
                )}

                {/*  Controls */}
                <div className="grid grid-cols-2 mt-8">
                    <div>
                        <button
                            type="button"
                            className="w-25 py-2 text-left mr-auto block rounded-sm cursor-pointer"
                            onClick={() => setStep(step === 1 ? 1 : step - 1)}
                        >Previous
                        </button>
                    </div>
                    <div>
                        {step === maxFormSteps ? <button
                            type="button"
                            className="w-40 py-2 block ml-auto bg-blue-600 text-white rounded-sm cursor-pointer hover:bg-blue-700 transition"
                            onClick={handleSubmit}
                        >Create Account
                        </button> : <button
                            type="button"
                            className="w-40 py-2 block ml-auto bg-blue-600 text-white rounded-sm cursor-pointer hover:bg-blue-700 transition"
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
                             redirect={() => handleSignInWithOAuth('google')}/>
            <SignInWithOAuth title="Continue with Linkedin" provider="linkedin"
                             redirect={() => handleSignInWithOAuth('linkedin')}/>
        </div>
    );
};

export default RegisterPage;
