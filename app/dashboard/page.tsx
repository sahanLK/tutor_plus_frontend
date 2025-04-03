'use client';
import AuthGuard from "@/components/AuthGuard";
import {GoCloudOffline} from "react-icons/go";

const DashBoard = () => {
    return (
        <div className="grid grid-cols-13 min-h-screen">
            {/* Sidebar */}
            <div className="col-span-2 px-4 bg-gray-600 text-white" style={{backgroundColor: "#405189"}}>
                <section>
                    <span className="text-stone-600 text-sm">Menu</span>
                    <ul>
                        <li className="flex"><span><GoCloudOffline/></span>Home</li>
                        <li>Analytics</li>
                        <li>Layouts</li>
                    </ul>
                </section>
                <section>
                    <span className="text-stone-600 text-sm">Menu</span>
                    <ul>
                        <li>Home</li>
                        <li>Analytics</li>
                        <li>Layouts</li>
                    </ul>
                </section>
            </div>

            {/* Page */}
            <div className="col-span-11 px-6 py-2">
                <h2 className="text-md">Good Morning, Anna!</h2>
                <p className="text-sm text-stone-500 mt-1">Here&#39;s what&#39;s happening with your store today.</p>
            </div>
        </div>
    )
}

export default AuthGuard(DashBoard);