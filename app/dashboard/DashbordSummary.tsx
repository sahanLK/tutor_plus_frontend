import DashBoardCard from "@/components/dashboard/Card";
import { useEffect } from "react";
import { IconBaseProps } from "react-icons";
import { FaBookReader } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";


export default function DashBoardSummary() {

    return (
        <>
            {/* Cards */}
            <div className="cards flex flex-wrap gap-x-10 mt-12">
                <DashBoardCard
                    title='MY JOBS'
                    value="2"
                    url={""}
                    urlText={"View all Jobs"}
                    Icon={LiaChalkboardTeacherSolid} iconColor="#0ab39c" iconBgColor="#cffcf6"
                />
            </div>
        </>

    )
}