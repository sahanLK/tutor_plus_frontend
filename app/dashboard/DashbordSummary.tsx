'use client';

import DashBoardCard from "@/components/dashboard/Card";
import WorkHistory from "@/components/dashboard/charts/WorkHistory";
import { RootState } from "@/lib/store/store";
import { getFormattedDate } from "@/utils";
import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineAttachMoney } from "react-icons/md";
import { PiCoins } from "react-icons/pi";
import { useSelector } from "react-redux";


export default function DashBoardSummary() {
    const activeRole = useSelector((state: RootState) => state.config.activeRole);
    const [dailyRoutine, setDailyRoutine] = useState([])


    return (
        <>
            {/* Cards */}
            <div className="cards flex flex-wrap gap-x-10 mt-12 gap-y-5">
                {activeRole == 'teacher' && (
                    <DashBoardCard
                        title='MY JOBS'
                        value="2"
                        url1="/jobs"
                        urlText1="View all Jobs"
                        Icon={LiaChalkboardTeacherSolid}
                        iconColor="#0ab39c"
                        iconBgColor="#cffcf6" url2={null} urlText2={null} />
                )}
                {activeRole == 'student' && (
                    <DashBoardCard
                        title='Posts'
                        value="16"
                        url1="/jobs/new"
                        urlText1="Create New"
                        Icon={MdOutlineAttachMoney}
                        iconColor="#0ab39c"
                        iconBgColor="#cffcf6" url2={null} urlText2={null} />
                )}

                <DashBoardCard
                    title='Coins'
                    value="540"
                    url1={""}
                    urlText1="Coins history"
                    Icon={PiCoins} iconColor="#e6c300" iconBgColor="#fffbe6" url2={null} urlText2={null} />
                <DashBoardCard
                    title='Account Balance'
                    value="1260 USD"
                    url1={""}
                    urlText1="Earning history"
                    Icon={MdOutlineAttachMoney}
                    iconColor="#0099e6"
                    iconBgColor="#e6f7ff" url2={null} urlText2={null} />
            </div>

            {/* Summary Analytics */}
            <div className="grid grid-cols-12 mt-20 gap-5">
                <div className="col-span-9">
                    <div className="p-5 bg-white min-h-40">
                        <h1 className="text-stone-600 text-sm">Hey, this is your routine today</h1>
                        {dailyRoutine.length == 0 ? (
                            <div className="text-center mt-10">
                                <BsEmojiSmile className="mx-auto text-yellow-400" size={25} />
                                <h1 className="text-stone-500 text-xs mt-2">Looks like you're free</h1>
                            </div>
                        ) : (
                            <>

                            </>
                        )}
                    </div>
                    <div className="p-5 bg-white min-h-50 mt-10">
                        <WorkHistory />
                    </div>
                </div>
                <div className="col-span-3 px-3h-full">
                    <div className=" p-5 bg-white text-stone-500 text-sm h-full">
                        <h1 className="text-stone-600">Recent Activities</h1>
                        <small className="text-stone-500 mb-5">Here's what's happening for last 48 hours.</small>
                        <ul>
                            
                        </ul>
                    </div>
                </div>
            </div>

        </>

    )
}