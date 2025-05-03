'use client';

import styles from "./page.module.css";
import Image from "next/image";
import bannerImg from "@/public/homepage/banner.png";
import boy from "@/public/homepage/boy.png";
import Course from "@/components/courses/Course";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {RootState} from "@/lib/store/store";


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
            <section className={`${styles.headerHome} h-screen`}>
                <div className="container mx-auto px-10 py-5 flex items-center h-screen">
                    <div className="grid grid-cols-2 mb-50">
                        <div className="my-auto">
                            <h2 className="text-6xl font-bold space-y-3 text-stone-700 tracking-sm leading-tight">
                                Top <span className="text-yellow-600">Instructors</span> From<br/> All Around the World.
                            </h2>
                            <p className="mt-8 mb-16 leading-7 text-stone-600">
                                Connecting Teachers and Students from all around the world, while integrating, <br/>
                                everything you need for a seamless online Tutoring and Learning experience.
                            </p>
                            <a className="bg-blue-800 px-6 py-4 text-white tracking-wide">Get Started for Free</a>
                        </div>
                        <div className="mx-au">
                            <Image src={bannerImg} alt="bannner" className="h-auto" aria-hidden={true}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto bg-gray-100 border-t-1 py-18 border-gray-300">
                <div className="grid grid-cols-2 py-10">
                    <div className="ml-auto px-16">
                        <Image src={boy} alt="boy"/>
                    </div>
                    <div className="">
                        <label className="text-blue-600 bg-blue-100 text-sm px-4 py-2">Looking for a Tutor?</label>
                        <h2 className="text-3xl font-bold text-stone-700 mt-4 mb-4">
                            Discover All Around the World in Seconds<br/>
                        </h2>
                        <p className="text-stone-600 mb-15">
                            Search for talented, Top-Rated instructors, for your unique situation and needs.
                        </p>
                        <a className="bg-blue-800 px-8 py-4 text-white tracking-wide rounded">Find Your Tutor</a>
                    </div>
                </div>
            </section>

            <section className="container mx-auto bg-gray-100 my-10 rounded-lg">
                <h2 className="text-3xl font-bold text-stone-700 mt-10 mb-8">Featured Courses</h2>
                <div className="flex gap-5 flex-wrap gap-y-10 mb-10">
                    <Course/>
                    <Course/>
                    <Course/>
                    <Course/>
                    <Course/>
                </div>
            </section>

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