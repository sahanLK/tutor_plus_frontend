'use client';

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/sidebar/SidebarRoot";
import api from "@/lib/axios/axios";
import { RootState } from "@/lib/store/store";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashBoardSummary from "./DashbordSummary";
import DashboardAnalytics from "./DashboardAnalytics";


const DashBoard = () => {
    const searchParams = useSearchParams();
    const dashboardContent = searchParams.get('section');

    const [user, setUser] = useState({});
    const router = useRouter();
    const activeRole = useSelector((state: RootState) => state.config.activeRole);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const token = localStorage.getItem('access_token');
    //       try {
    //         const res = await api.get('/users/account-details', {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         });
    //         console.log(res.data);
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     };

    //     fetchData();
    //   }, []);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            try {
                const res = await api.get('/users/account-details', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
            } catch (err: unknown) {
                const error = err as AxiosError;

                if (error.response?.status === 401) {
                    router.push("/auth/login")
                }
            }
        };

        fetchData();
    }, []);


    return (
        <div className="grid grid-cols-13 min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Page */}
            <div className="col-span-11 px-7 py-5">
                <h2 className="text-md">Good Morning, Sahan!</h2>
                <p className="text-sm text-stone-500 mt-1">Here&#39;s what&#39;s happening today.</p>

                {dashboardContent == 'analytics' ? <DashboardAnalytics /> : <DashBoardSummary />}

            </div>
        </div>
    )
}

export default AuthGuard(DashBoard);