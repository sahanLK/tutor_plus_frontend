'use client';
import Redirector from "@/components/Redirector";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {/* Hero Section */}
            <section className="relative h-[500px] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <h1 className="text-5xl font-bold mb-4">Find the Best Tutors Online</h1>
                <p className="text-lg mb-6">Connect with expert teachers in any subject, anywhere in the world.</p>
                <button className="bg-white text-blue-600 px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">Get Started</button>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden border p-6 flex flex-col items-center">
                    <svg className="w-12 h-12 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l-4-4m0 0l4-4m-4 4h16" /></svg>
                    <h2 className="text-xl font-semibold">Easy Search</h2>
                    <p className="text-gray-600 text-center">Find tutors based on subjects, experience, and reviews.</p>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden border p-6 flex flex-col items-center">
                    <svg className="w-12 h-12 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l4-4m0 0l-4-4m4 4H4" /></svg>
                    <h2 className="text-xl font-semibold">Top Tutors</h2>
                    <p className="text-gray-600 text-center">Learn from highly rated and experienced teachers.</p>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden border p-6 flex flex-col items-center">
                    <svg className="w-12 h-12 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    <h2 className="text-xl font-semibold">Global Reach</h2>
                    <p className="text-gray-600 text-center">Access top tutors from anywhere in the world.</p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-purple-100 text-gray-900 text-center">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-4xl font-bold text-blue-600">#1</h2>
                        <p className="mt-2">In online tutoring for students worldwide.</p>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-purple-600">99.99%</h2>
                        <p className="mt-2">Positive feedback from satisfied learners.</p>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-green-600">600k+</h2>
                        <p className="mt-2">Students learning with us globally.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-blue-600 text-white text-center">
                <h2 className="text-3xl font-bold">Start Learning Today!</h2>
                <p className="mt-4 text-lg">Join thousands of students and find the perfect tutor for your needs.</p>
                <button className="mt-6 bg-white text-blue-600 px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">Sign Up Now</button>
            </section>
        </div>
    );
}

export default Redirector(HomePage);