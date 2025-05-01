'use client';

import { SlGraduation, SlPeople } from "react-icons/sl";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import SidebarItem from "./SidebarItem";
import { MdOutlineAssignment, MdOutlineQuiz } from "react-icons/md";
import SidebarLink from "./SidebarLink";



export default function SidebarRoot() {
    // const activeRole = useSelector((state: RootState) => state.config.activeRole);

    // return activeRole == 'student' ? <SidebarStudent /> : <SidebarTutor />;

    function handleDropdown(e: React.MouseEvent<HTMLSpanElement>) {
        console.log(e);
    }

    return (
        <div className="col-span-2 px-4 pt-10 bg-gray-60 shadow pl-6 bg-[#405189] text-white">
            <SidebarItem title="Dashboard" Icon={RxDashboard} iconSize={16}>
                <SidebarLink title="Summary" url="/dashboard" />
                <SidebarLink title="Analytics" url="/dashboard?section=analytics" />
            </SidebarItem>

            <SidebarItem title="Classes" Icon={SlPeople} iconSize={16}>
                <Link href="/classes"><li className="pl-8 my-5">-&emsp;All Classes</li></Link>
                <Link href="/classes"><li className="pl-8 my-5">-&emsp;Schedule</li></Link>
            </SidebarItem>

            <SidebarItem title="Assignments" Icon={MdOutlineAssignment} iconSize={16}>
                <Link href="/classes"><li className="pl-8 my-5">-&emsp;All Assignments</li></Link>
                <Link href="/classes"><li className="pl-8 my-5">-&emsp;Asign</li></Link>
                <Link href="/classes"><li className="pl-8 my-5">-&emsp;Create</li></Link>
            </SidebarItem>

            <SidebarItem title="Quizzes" Icon={MdOutlineQuiz} iconSize={16}>
                <Link href="/classes"><li className="pl-8 my-5">-&emsp;All Quizzes</li></Link>
                <Link href="/classes"><li className="pl-8 my-5">-&emsp;Create</li></Link>
            </SidebarItem>

            <SidebarItem title="Courses" Icon={SlGraduation} iconSize={16}>
                <Link href="/classes"><li className="pl-8 my-5">-&emsp;All</li></Link>
            </SidebarItem>
        </div>
    )
}
