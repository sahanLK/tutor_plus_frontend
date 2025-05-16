'use client';

import {SlGraduation, SlPeople} from "react-icons/sl";
import Link from "next/link";
import {RxDashboard} from "react-icons/rx";
import SidebarItem from "./SidebarItem";
import {MdOutlineAssignment, MdOutlineQuiz} from "react-icons/md";
import SidebarLink from "./SidebarLink";


export default function SidebarRoot() {
    return (
        <>
            <SidebarItem title="Dashboard" Icon={RxDashboard} iconSize={16}>
                <SidebarLink title="Summary" url="/dashboard"/>
            </SidebarItem>

            <SidebarItem title="Classes" Icon={SlPeople} iconSize={16}>
                <Link href="/classes">
                    <li className="pl-8 my-5">-&emsp;All Classes</li>
                </Link>
                <Link href="/classes">
                    <li className="pl-8 my-5">-&emsp;Schedule</li>
                </Link>
            </SidebarItem>

            <SidebarItem title="Assignments" Icon={MdOutlineAssignment} iconSize={16}>
                <Link href="/classes">
                    <li className="pl-8 my-5">-&emsp;All Assignments</li>
                </Link>
                <Link href="/classes">
                    <li className="pl-8 my-5">-&emsp;Asign</li>
                </Link>
                <Link href="/classes">
                    <li className="pl-8 my-5">-&emsp;Create</li>
                </Link>
            </SidebarItem>

            <SidebarItem title="Quizzes" Icon={MdOutlineQuiz} iconSize={16}>
                <Link href="/classes">
                    <li className="pl-8 my-5">-&emsp;All Quizzes</li>
                </Link>
                <Link href="/classes">
                    <li className="pl-8 my-5">-&emsp;Create</li>
                </Link>
            </SidebarItem>

            <SidebarItem title="Courses" Icon={SlGraduation} iconSize={16}>
                <Link href="/classes">
                    <li className="pl-8 my-5">-&emsp;All</li>
                </Link>
            </SidebarItem>
        </>
    )
}
