'use client';

import AuthGuard from "@/components/AuthGuard";
import DashBoardCard from "@/components/dashboard/Card";
import Sidebar from "@/components/Sidebar";

const DashBoard = () => {
    return (
        <div className="grid grid-cols-13 min-h-screen">
            {/* Sidebar */}
            <Sidebar/>

            {/* Page */}
            <div className="col-span-11 px-6 py-4">
                <h2 className="text-md">Good Morning, Anna!</h2>
                <p className="text-sm text-stone-500 mt-1">Here&#39;s what&#39;s happening with your store today.</p>

                <div className="cards flex flex-wrap gap-x-10 mt-12">
                    <DashBoardCard title="Classes Today" />
                    <DashBoardCard title="Assignments Today" />
                </div>
               
            </div>
        </div>
    )
}

export default AuthGuard(DashBoard);