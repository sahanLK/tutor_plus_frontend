'use client';
import React, {useState} from "react";
import styles from "@/app/auth/login/page.module.css";
import SignInWithOAuth from "@/components/auth/SignInWithOAuth";

const RegisterPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Move to the next step
    const nextStep = () => {
        setStep((prev) => prev + 1);
    };

    // Move to the previous step
    const prevStep = () => {
        setStep((prev) => prev - 1);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Final Form Data:", formData);

        const response = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Registration Successful!");
        } else {
            alert("Error in registration!");
        }
    };

    return (
        <div style={{maxWidth: "400px", margin: "auto", textAlign: "center"}} className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold mb-6">Create an Account</h2>

            {/* Step 1: Email */}
            {step === 1 && (
                <>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <button
                        onClick={nextStep}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >Next
                    </button>
                </>
            )}

            {/* Step 2: Username */}
            {step === 2 && (
                <>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <button
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={prevStep}>Back
                    </button>
                    <button onClick={nextStep}
                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Next
                    </button>
                </>
            )}

            {/* Step 3: Password & Submit */}
            {step === 3 && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={prevStep}>Back
                    </button>
                    <button type="submit">Submit</button>
                </form>
            )}

            <div>
                <h2 className="mt-auto">Step {step} of 3</h2>
            </div>

            <div className={`${styles.separator} mb-6 mt-10`}>
                <span className="font-light text-xs">OR</span>
            </div>

            <div className="">
                <SignInWithOAuth title="Continue with Google" provider="google"
                                 redirect={() => handleSignInWithOAuth('google')}/>
                <SignInWithOAuth title="Continue with Linkedin" provider="linkedin"
                                 redirect={() => handleSignInWithOAuth('linkedin')}/>
            </div>
        </div>
    );
};

export default RegisterPage;
