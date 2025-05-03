'use client';

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/sidebar/SidebarRoot";
// import {RootState} from "@/lib/store/store";
import {useSearchParams} from "next/navigation";
import React, {Suspense} from "react";
// import {useSelector} from "react-redux";
import Spinner from "@/components/spinner/Spinner";
import DashboardAnalytics from "./DashboardAnalytics";
import DashBoardSummary from "./DashbordSummary";


const DashBoard: React.FC = () => {
    const searchParams = useSearchParams();
    const dashboardContent = searchParams.get('section');

    // const [user, setUser] = useState({});
    // const router = useRouter();
    // const activeRole = useSelector((state: RootState) => state.config.activeRole);


    return (
        <div className="grid grid-cols-13 min-h-screen">
            {/* Sidebar */}
            <Sidebar/>

            {/* Page */}
            <div className="col-span-11 px-7 py-5">
                <h2 className="text-md">Good Morning, Sahan!</h2>
                <p className="text-sm text-stone-500 mt-1">Here&#39;s what&#39;s happening today.</p>

                <Suspense fallback={<Spinner/>}>
                    {dashboardContent == 'analytics' ? <DashboardAnalytics/> : <DashBoardSummary/>}
                </Suspense>

            </div>
        </div>
    )
}

export default AuthGuard(DashBoard);