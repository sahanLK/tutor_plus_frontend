import { FaStar, FaRegStar, FaStarHalfAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import styles from "./page.module.css";
import Image from "next/image";


export default function TeacherProfile() {
    return (
        <div className="max-w-7xl mx-auto my-10 min-h-screen">
            {/* Profile Header */}
            <div className="profile-header grid grid-cols-2">
                <div className="px-20 ml-30">
                    <Image src="/avatar.png" alt="profile-pic" width={200} height={200} className="rounded-full" />
                </div>
                <div>
                    <h2 className="text-xl text-stone-600">Sahan Lakshitha</h2>
                    <p>Software Engineer</p>
                </div>
            </div>

            {/* Profile Sections */}
            <div className="border-b-1 border-stone-300 mt-15">
                <ul className="flex gap-x-10">
                    <li>Reviews</li>
                    <li>Subjects</li>
                </ul>
            </div>
            
            {/* Section Data */}
            <div>
                <h2>Content</h2>
            </div>
        </div>
    );
}
