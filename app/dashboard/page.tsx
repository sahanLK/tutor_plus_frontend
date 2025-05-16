'use client';

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/sidebar/SidebarRoot";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Spinner from "@/components/spinner/Spinner";
import DashBoardSummary from "./DashbordSummary";
import api from "@/lib/axios/axios";
import { AxiosError } from "axios";
import { X } from "lucide-react";
import { getFormattedDate } from "@/utils";


const DashBoard: React.FC = () => {
    const searchParams = useSearchParams();
    const dashboardContent = searchParams.get('section');
    const [notifications, setNotifications] = useState<{ id: number, message: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const formattedDate = getFormattedDate();


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
        <div className="grid grid-cols-15 min-h-screen">
            {/* Sidebar */}
            <div className="col-span-2 bg-[#405189] text-stone-200 pl-6 pr-4 py-8 shadow-xl font-hankens">
                <Sidebar />
            </div>

            {/* Page */}
            <div className="col-span-13 px-7 py-5">
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

                <div className="col-span-10">
                    <h2 className="text-md">Good Morning, Sahan!</h2>
                    <p className="text-sm text-stone-500 mt-1">{formattedDate}</p>
                </div>

                <Suspense fallback={<Spinner size={0} color={""} />}>
                    <DashBoardSummary />
                </Suspense>
            </div>
        </div>
    )
}

export default AuthGuard(DashBoard);