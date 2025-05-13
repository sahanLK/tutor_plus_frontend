'use client';

import styles from "./page.module.css";
import Image from "next/image";
// import bannerImg from "@/public/homepage/banner.png";
// import boy from "@/public/homepage/boy.png";
import findTutors from "@/public/find-tutors.png";
import findTutorJobs from "@/public/find-tutor-job.png";
import Course from "@/components/courses/Course";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store/store";
import Link from "next/link";


const HomePage = () => {
    const router = useRouter();
    const loggedIn = useSelector((state: RootState) => state.auth.token ? true : false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (loggedIn) {
            router.replace('/dashboard');
        } else {
            setChecked(true);
        }
    }, [loggedIn]);

    if (!checked) return null;

    return (
        <div>
            <section className="bg-[url('/banner.jpg')] min-h-fit relative">
                <div className="absolute inset-0 bg-black/45"></div>
                <div className="container mx-auto px-10 py-5 flex items-center">
                    <div className="grid grid-cols-1  mb-50 relative z-2">
                        <div className="my-auto mt-50">
                            <h2 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold space-y-3 text-stone-200 leading-tight ">
                                Top <span className="text-yellow-500 leading-24">Instructors</span><br /> From All Around the World.
                            </h2>
                            <p className="mt-8 mb-16 leading-7 text-stone-100 backdrop-blur-xs">
                                Seamlessly connecting Teachers and Students from all around the world.
                            </p>

                            <Link href="/auth/register" className="bg-blue-800 px-6 py-4 text-white tracking-wide mr-5">Let's Get Started</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Find Tutors */}
            <section className="container mx-auto bg-gray-100 border-t-1 py-10 border-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="px-16 space-y-5">
                        <Image src={findTutors} alt="Find Tutors" />
                    </div>
                    <div className="my-auto text-center md:text-left">
                        <label className="text-blue-600 bg-blue-100 text-sm px-4 py-2">It's totally free.</label>
                        <h2 className="text-3xl font-bold text-stone-700 mt-4 mb-4">Looking for a Teacher?<br /></h2>
                        <p className="text-stone-600 mb-15">Find the best tutor for your unique situation and needs from worldwide.</p>
                        <Link href="/" className="bg-green-700 text-white rounded px-6 py-3">Find Your Teacher</Link>
                    </div>
                </div>
            </section>

            {/* Find Tutor Jobs */}
            <section className="container mx-auto bg-gray-100 border-t-1 py-10 border-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="my-auto text-center md:text-left order-2 md:order-1 ml-5 lg:ml-40">
                        <label className="text-blue-600 bg-blue-100 text-sm px-4 py-2">It's totally free.</label>
                        <h2 className="text-3xl font-bold text-stone-700 mt-4 mb-4">Looking for Tutor Jobs?<br /></h2>
                        <p className="text-stone-600 mb-15">Earn money while sharing your expertise all over the world.</p>
                        <Link href="/" className="bg-green-700 text-white rounded px-6 py-3">Find Teaching Jobs</Link>
                    </div>
                    <div className="space-y-5 px-16 flex items-center order-1 md:order-2">
                        <Image src={findTutorJobs} alt="Find Tutors" />
                    </div>
                </div>
            </section>

            {/* <section className="container mx-auto bg-gray-100 my-10 rounded-lg border-t-1 py-10 border-gray-300">
                <h2 className="text-3xl font-bold text-stone-700 mb-4">Featured Courses</h2>
                <label className="text-blue-600 bg-blue-100 text-sm px-4 py-2">It's Designed for You.</label>
                <div className="flex gap-5 flex-wrap gap-y-10 mb-10 mt-10">
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                </div>
            </section> */}

            {/* <section className="container mx-auto bg-blue-700 p-10 text-white rounded-lg shadow-lg text-center py-14">
                <div>
                    <p>Receive huge benefits with our lifetime Plumbing Receive huge benefits with our lifetime Plumbing email address will be shown</p>
                </div>
                <div className="mt-16">
                    <a className="bg-white rounded text-stone-700 py-4 px-6 text-sm">BECOME AN INSTRUCTOR</a>
                </div>
            </section> */}
        </div>
    );
}

export default HomePage;