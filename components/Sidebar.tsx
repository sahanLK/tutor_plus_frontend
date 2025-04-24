import { GoCloudOffline } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { SlGraduation } from "react-icons/sl";
import { AiOutlineDollarCircle } from "react-icons/ai";


export default function Sidebar() {
    return (
        <div className="col-span-2 px-4 pt-10 bg-gray-60 shadow pl-6 bg-[#405189] text-white">
            <section className="mb-10">
                <span className="flex items-center"><RxDashboard size={20} />&emsp;Dashboard</span>
                <ul className="mt-2 text-sm">
                    <li className="pl-8 my-5">-&emsp;Summary</li>
                    <li className="pl-8 my-5">-&emsp;Analytics</li>
                </ul>
            </section>

            <section className="mb-10">
                <span className="flex items-center"><SlGraduation size={20} />&emsp;Classes</span>
                <ul className="mt-2 text-sm">
                    <li className="pl-8 my-5">-&emsp;All Classes</li>
                    <li className="pl-8 my-5">-&emsp;Schedule</li>
                </ul>
            </section>

            <section className="mb-10">
                <span className="flex items-center"><AiOutlineDollarCircle size={22} />&emsp;Payments</span>
                <ul className="mt-2 space-y-10">
                </ul>
            </section>
        </div>
    )
}
