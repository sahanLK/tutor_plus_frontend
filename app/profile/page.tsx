'use client';

import Ratings from "@/components/ratings/Ratings";
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
    const [selectedSection, setSelectedSection] = useState(1);
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
                        <h2 className="text-2xl mb-2">{profileDetails?.first_name}&nbsp;{profileDetails?.last_name}</h2>
                        <p className="text-md mb-5">Software Engineer</p>
                        <Ratings value={4} onChange={() => 4} totalStars={5} />
                    </div>
                </div>
            </div>

            {/* Profile Sections */}
            <div className="border-b-1 border-stone-300 mt-15">
                <ul className="flex gap-x-10">
                    <li className={`text-stone-800 cursor-pointer py-2 ${selectedSection === 1 ? 'text-stone-700 border-b-5 border-black' : ''}`} onClick={() => setSelectedSection(1)}>Summary</li>
                    <li className={`text-stone-800 cursor-pointer py-2 ${selectedSection === 2 ? 'text-stone-700 border-b-5 border-black' : ''}`} onClick={() => setSelectedSection(2)}>Subjects</li>
                    <li className={`text-stone-800 cursor-pointer py-2 ${selectedSection === 3 ? 'text-stone-700 border-b-5 border-black' : ''}`} onClick={() => setSelectedSection(3)}>Pricing</li>
                    <li className={`text-stone-800 cursor-pointer py-2 ${selectedSection === 4 ? 'text-stone-700 border-b-5 border-black' : ''}`} onClick={() => setSelectedSection(4)}>Courses</li>
                </ul>
            </div>

            {/* Section Data */}
            <div className="mt-7 text-stone-600">
                {selectedSection == 1 && (
                    <div>
                        Hi, I'm a professional software developer with 3+ years of experience in the industry. I deliver solutions effectively 
                        and reliably that lead companies reach.
                    </div>
                )}

                {selectedSection == 2 && (
                    <div>

                    </div>
                )}

                {selectedSection == 3 && (
                    <div>

                    </div>
                )}

                {selectedSection == 4 && (
                    <div>

                    </div>
                )}

            </div>
        </div>
    );
}
