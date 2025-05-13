'use client';

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/sidebar/SidebarRoot";
// import {RootState} from "@/lib/store/store";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
// import {useSelector} from "react-redux";
import Spinner from "@/components/spinner/Spinner";
import DashboardAnalytics from "./DashboardAnalytics";
import DashBoardSummary from "./DashbordSummary";
import api from "@/lib/axios/axios";
import { AxiosError } from "axios";
import { X } from "lucide-react";


const DashBoard: React.FC = () => {
    const searchParams = useSearchParams();
    const dashboardContent = searchParams.get('section');
    const [notifications, setNotifications] = useState<{ id: number, message: string }[]>([]);
    const [loading, setLoading] = useState(false);

    // const [user, setUser] = useState({});
    // const router = useRouter();
    // const activeRole = useSelector((state: RootState) => state.config.activeRole);
    useEffect(() => {
        async function fetchNotifications() {
            setLoading(true);
            try {
                const { data } = await api.get('/users/notifications');
                setNotifications(data.notifications);
            } catch (err) {
                const error = err as AxiosError;
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchNotifications();
    }, []);

    function dismissNotification(id: number) {
        setNotifications(notifications.filter(item => item.id != id));
    }

    return (
        <div className="grid grid-cols-13 min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Page */}
            <div className="col-span-11 px-7 py-5">
                {notifications.length > 0 && (
                    <div className="w-full mb-10 ">
                        {notifications.map((notification) => (
                            <h3
                                className="px-3 py-2 bg-green-600 rounded text-stone-100 text-sm w-full flex items-center"
                                key={notification.id}>{notification.message}
                                <X className="ml-auto cursor-pointer" size={15} onClick={() => dismissNotification(notification.id)} />
                            </h3>
                        ))}
                    </div>
                )}

                <h2 className="text-md">Good Morning, Sahan!</h2>
                <p className="text-sm text-stone-500 mt-1">Here&#39;s what&#39;s happening today.</p>

                <Suspense fallback={<Spinner size={0} color={""} />}>
                    {dashboardContent == 'analytics' ? <DashboardAnalytics /> : <DashBoardSummary />}
                </Suspense>
            </div>
        </div>
    )
}

export default AuthGuard(DashBoard);