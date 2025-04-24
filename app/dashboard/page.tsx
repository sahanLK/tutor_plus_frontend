'use client';

import AuthGuard from "@/components/AuthGuard";
import DashBoardCard from "@/components/dashboard/Card";
import Sidebar from "@/components/Sidebar";
import { FaBookReader } from "react-icons/fa";


const DashBoard = () => {
    return (
        <div className="grid grid-cols-13 min-h-screen">
            {/* Sidebar */}
            <Sidebar/>

            {/* Page */}
            <div className="col-span-11 px-7 py-5">
                <h2 className="text-md">Good Morning, Anna!</h2>
                <p className="text-sm text-stone-500 mt-1">Here&#39;s what&#39;s happening with your store today.</p>

                <div className="cards flex flex-wrap gap-x-10 mt-12">
                    {/* <DashBoardCard title="Classes Today" value="" icon=<FaBookReader /> url="" urlText="" /> */}
                    {/* <DashBoardCard title="Assignments Today" value="" Icon="" url="" urlText="" />
                    <DashBoardCard title="Quizzes Today" value="" Icon="" url="" urlText="" />
                    <DashBoardCard title="My Balance" value="$230" Icon="" url="" urlText="" /> */}
                    <div className="w-80 h-40 pl-8 py-8 bg-[#6a73fa] rounded text-white">
                        <div className="flex">
                            <div className="w-2/3">
                                <h3 className="text-xl pb-3">Classes Today</h3>
                                <h1 className="text-3xl font-bold">2</h1>
                            </div>
                            <div className="w-1/3 flex items-center">
                                <FaBookReader size={40} />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthGuard(DashBoard);