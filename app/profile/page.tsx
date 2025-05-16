'use client';

import Spinner from "@/components/spinner/Spinner";
import { API_ROOT } from "@/config";
import api from "@/lib/axios/axios";
import { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";


type ProfileDetailsType = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    profile_image: string,
}

export default function TeacherProfile() {
    const [profileDetails, setProfileDetails] = useState<ProfileDetailsType>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const resp = await api.get(`${API_ROOT}/api/users/account-details`);

                if (resp.status === 200) {
                    const data = await resp.data;
                    console.log(data);
                    setProfileDetails(data);
                }
            } catch (err) {
                const error = err as AxiosError;
                setError(error.message);
                console.log(error.message)
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <Spinner size={20} color="white" />;
    if (error) return "Error fetching profile";

    return (
        <div className="max-w-7xl mx-auto my-10 min-h-screen px-5">
            {/* Profile Header */}
            <div className="profile-header grid grid-cols-1 md:grid-cols-3">
                <div className="mx-auto col-span-1">
                    <Image src={profileDetails?.profile_image || '/avatar.png'} alt="profile-pic" width={200} height={200} className="rounded-full" />
                </div>
                <div className="mx-auto md:mx-0 flex items-center col-span-2 text-center md:text-left pt-5 md:pt-0">
                    <div className="text-stone-600 ">
                        <h2 className="text-3xl mb-3">{profileDetails?.first_name}&nbsp;{profileDetails?.last_name}</h2>
                        <p>Software Engineer</p>
                        
                    </div>
                </div>
            </div>

            {/* Profile Sections */}
            <div className="border-b-1 border-stone-300 mt-15">
                <ul className="flex gap-x-10">
                    <li>Reviews</li>
                    <li>Subjects</li>
                </ul>
            </div>

            {/* Section Data */}
            <div>
                <h2>Content</h2>
            </div>
        </div>
    );
}
