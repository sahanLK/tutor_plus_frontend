import { RxDashboard } from "react-icons/rx";
import { SlGraduation } from "react-icons/sl";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineAssignment } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { MdOutlineStorefront } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import Link from "next/link";


export default function SidebarTutor() {
    return (
        <div className="col-span-2 px-4 pt-10 bg-gray-60 shadow pl-6 bg-[#405189] text-white">
            <section className="mb-10">
                <span className="flex items-center"><RxDashboard size={16} />&emsp;Dashboard</span>
                <ul className="mt-2 text-sm">
                    <Link href="/dashboard"><li className="pl-8 my-5 text-sm">-&emsp;Summary</li></Link>
                    <Link href="/dashboard/?section=analytics"><li className="pl-8 my-5">-&emsp;Analytics</li></Link>
                </ul>
            </section>

            <section className="mb-10">
                <span className="flex items-center"><SlPeople size={16} />&emsp;Classroom</span>
                <ul className="mt-2 text-sm">
                    <Link href="/classes"><li className="pl-8 my-5">-&emsp;All Classes</li></Link>
                    <li className="pl-8 my-5">-&emsp;Schedule</li>
                </ul>
            </section>

            <section className="mb-10">
                <span className="flex items-center"><MdOutlineAssignment size={16} />&emsp;Assignments</span>
                <ul className="mt-2 text-sm">
                    <Link href="/classes"><li className="pl-8 my-5">-&emsp;All Assignments</li></Link>
                    <li className="pl-8 my-5">-&emsp;Assign</li>
                    <li className="pl-8 my-5">-&emsp;Create</li>
                </ul>
            </section>

            <section className="mb-10">
                <span className="flex items-center"><MdOutlineQuiz size={16} />&emsp;Quizzes</span>
                <ul className="mt-2 text-sm">
                    <Link href="/classes"><li className="pl-8 my-5">-&emsp;All Quizzes</li></Link>
                    <li className="pl-8 my-5">-&emsp;Assign</li>
                    <li className="pl-8 my-5">-&emsp;Create</li>
                </ul>
            </section>

            <section className="mb-10">
                <span className="flex items-center"><SlGraduation size={16} />&emsp;Courses</span>
                <ul className="mt-2 text-sm">
                    <li className="pl-8 my-5">-&emsp;Marketplace</li>
                    <li className="pl-8 my-5">-&emsp;My Courses</li>
                </ul>
            </section>

            <section className="mb-10">
                <span className="flex items-center"><MdOutlineStorefront size={16} />&emsp;Store</span>
            </section>

            <section className="mb-10">
                <Link href="/payments"><span className="flex items-center"><MdAttachMoney size={20} />&emsp;Payments</span></Link>
            </section>
        </div>
    )
}