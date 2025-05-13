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
    email: string
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
        <div className="max-w-7xl mx-auto my-10 min-h-screen">
            {/* Profile Header */}
            <div className="profile-header grid grid-cols-2">
                <div className="px-20 ml-30">
                    <Image src="/avatar.png" alt="profile-pic" width={200} height={200} className="rounded-full" />
                </div>
                <div>
                    <h2 className="text-xl text-stone-600">{profileDetails?.first_name}&nbsp;{profileDetails?.last_name}</h2>
                    <p>Software Engineer</p>
                    <span>{profileDetails?.email}</span>
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
