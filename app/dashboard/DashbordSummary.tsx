import DashBoardCard from "@/components/dashboard/Card";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineAttachMoney } from "react-icons/md";
import { PiCoins } from "react-icons/pi";


export default function DashBoardSummary() {

    return (
        <>
            {/* Cards */}
            <div className="cards flex flex-wrap gap-x-10 mt-12 gap-y-5">
                <DashBoardCard title='MY JOBS' value="2" url={""} urlText="View all Jobs" Icon={LiaChalkboardTeacherSolid} iconColor="#0ab39c" iconBgColor="#cffcf6" />
                <DashBoardCard title='Coins' value="540" url={""} urlText="Coins history" Icon={PiCoins} iconColor="#e6c300" iconBgColor="#fffbe6" />
                <DashBoardCard title='Account Balance' value="1260 USD" url={""} urlText="Earning history" Icon={MdOutlineAttachMoney} iconColor="#0099e6" iconBgColor="#cceeff" />
            </div>
        </>

    )
}