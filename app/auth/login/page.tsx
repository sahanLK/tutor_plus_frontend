import styles from "./page.module.css";
import SignInWithOAuth from "@/components/auth/SignInWithOAuth";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

                <form className="space-y-4 mb-8">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>

                <div className={`${styles.separator} mb-6`}>
                    <span className="font-light text-xs">OR</span>
                </div>

                <div className="">
                    <SignInWithOAuth title="Continue with Google" provider="google" />
                    <SignInWithOAuth title="Continue with Linkedin" provider="linkedin" />
                </div>
            </div>
        </div>
    );
}
