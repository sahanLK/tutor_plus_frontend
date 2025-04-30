'use client';

import api from "@/lib/axios/axios";
import { AxiosError } from "axios";
import { setActiveRole } from "@/lib/store/UiConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";

import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { setLoggedIn } from "@/lib/store/authSlice";



export default function ToggleActiveRole() {
    const activeRole = useSelector((state: RootState) => state.config.activeRole);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();


    async function toggleActiveRole() {
        const newRole = (activeRole === "student") ? 'teacher' : 'student';

        try {
            const resp = await api.get(`/users/change-role?role=${newRole}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
            });

            dispatch(setActiveRole({ activeRole: newRole }));
            const data = await resp.data;
            setLoggedIn({access_token: data.access_token});
        } catch (err) {
            const error = err as AxiosError;
            console.log("Something Bad Happened: ", error);
            router.push("/auth/login");
        }
    }

    return (
        <li className="mt-5 mb-1">
            <button onClick={toggleActiveRole} className="flex w-full items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                {activeRole === 'teacher' ? (
                    <>
                        <PiStudentBold className="mr-3" size="18" />
                        <span className="text-sm">Student Profile</span>
                    </>
                ) : (
                    <>
                        <GiTeacher className="mr-3" size="18" />
                        <span className="text-sm">Teacher Profile</span>
                    </>
                )}

            </button>
        </li>
    )
}