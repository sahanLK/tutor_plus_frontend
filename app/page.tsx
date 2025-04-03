'use client';
import Redirector from "@/components/Redirector";
import styles from "./page.module.css";
import Image from "next/image";
import bannerImg from "@/public/homepage/banner.png";
import boy from "@/public/homepage/boy.png";


const HomePage = () => {
    return (
        <div>
            <section className={`${styles.headerHome} h-screen`} >
                <div className="container mx-auto p-10 flex items-center h-screen">
                    <div className="grid grid-cols-2">
                        <div className="my-auto">
                            <h2 className="text-6xl font-bold space-y-3 text-stone-800">Learn Skills From <br/>Our Top Instructors</h2>
                            <p className="mt-7 mb-12 leading-6 text-stone-600">Borem ipsum dolor sit amet, consectetur adipiscing elit. <br/>Ut elit tellus, luctus nec
                                ullamcorper mattisBorem ipsum dolor sit <br/>amet consectetur adipiscing area we followelit.</p>
                            <a className="bg-blue-800 px-6 py-3 text-white">Explore Courses</a>
                        </div>
                        <div>
                            <Image src={bannerImg} alt="bannner" className="h-auto" aria-hidden={true} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto bg-gray-100 border-t-1 border-gray-300">
                <div className="grid grid-cols-2">
                    <div>
                        <Image src={boy} alt="boy"/>
                    </div>
                    <div className="flex items-center">
                        <h2 className="text-4xl font-bold text-stone-800">
                            Discover Top Instructors <br/>Around The World
                        </h2>
                    </div>
                </div>
            </section>

            <section className="container mx-auto mt-10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-stone-800 mb-4">latest News & Blog</h1>
                    <p className="">Receive huge benefits with our lifetime Plumbing Receive huge benefits with our<br/>
                        lifetime Plumbing email address will be shown</p>
                </div>

                <div className="cards grid lg:grid-cols-3 md:grid-cols-2">
                    <div className="card">
                        Done
                    </div>
                    <div className="card">
                        Done
                    </div>
                    <div className="card">
                        Done
                    </div>
                    <div className="card">
                        Done
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Redirector(HomePage);