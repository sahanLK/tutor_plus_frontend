'use client'

import useApi from '@/hooks/useApi';
import api from '@/lib/axios/axios';
import { RootState } from '@/lib/store/store';
import { setActiveRole } from '@/lib/store/UiConfigSlice';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import { useSelector } from 'react-redux';

type ProfileDataType = {
    first_name: string | null,
    last_name: string | null,
    age: number | null,
    email: string | null,
    primary_role: "student" | "teacher" | "unknown",
}

type Role = "student" | "teacher" | "unknown";
const roles: Role[] = ["student", "teacher"];


export default function ProfileSettings() {
    const currentActiveRole = useSelector((state: RootState) => state.config.activeRole);
    const [profileImage, setProfileImage] = useState<File | null>();
    const { response, error, loading } = useApi<ProfileDataType>('http://localhost:8000/api/users/account-details');
    const [profileData, setProfileData] = useState<ProfileDataType | null>(null);
    console.log(profileData);

    useEffect(() => {
        if (response) {
            setProfileData({
                first_name: response.first_name,
                last_name: response.last_name,
                age: response.age,
                email: response.email,
                primary_role: response.primary_role || currentActiveRole,
            });
        }
    }, [response, currentActiveRole]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setProfileImage(file)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const resp = await api.get(`/users/change-role?role=${profileData?.primary_role}`);
        if (resp.status == 200) {
            setActiveRole({ activeRole: profileData?.primary_role || currentActiveRole });
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!profileData) return;
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    }

    function isValidRole(value: string): value is Role {
        return ["student", "teacher", "unknown"].includes(value);
    }

    function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        if (!profileData || !isValidRole(value)) return;
        setProfileData({ ...profileData, primary_role: value });
    }

    return (
        <div className='min-h-screen'>
            <div className="container mx-auto p-6 bg-white shadow rounded-lg mt-10">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Profile Settings</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Image */}
                    <div className="flex items-center gap-4">
                        <div className='relative inset-0'>
                            <div className='absolute w-full h-0.5 flex items-center pb-2'>
                                <CiCamera className='mx-auto mt-auto' size={40} />
                            </div>
                            <div className="w-40 h-40 rounded-full overflow-hidden bg-stone-200 relative">
                                {profileImage ? (
                                    <img
                                        src={URL.createObjectURL(profileImage)}
                                        alt="Profile Preview"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="flex items-center justify-center h-full text-sm text-gray-400">No Image</span>
                                )}
                            </div>
                        </div>
                        {/* <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            Upload
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label> */}
                    </div>

                    {/* First Name */}
                    <div className='flex items-center gap-10'>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={profileData?.first_name ? profileData.first_name : ''}
                                onChange={handleChange}
                                className="mt-1 block w-[300px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={profileData?.last_name ? profileData.last_name : ''}
                                onChange={handleChange}
                                className="mt-1 block w-[300px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profileData?.email ? profileData.email : ''}
                            onChange={handleChange}
                            className="mt-1 block w-full min-w-[300px] max-w-[500px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    {/* Primary Role */}
                    <div className='flex items-center gap-x-10'>
                        <label className="block text-sm font-medium text-gray-600">Primary Role</label>
                        <select
                            value={profileData?.primary_role}
                            onChange={handleRoleChange}
                            className="py-2 px-4 border-1 border-stone-400 text-stone-700 rounded"
                        >
                            <option value="Select">Select</option>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    {/* Save Button */}
                    <div className='mt-12'>
                        <button type="submit" className="w-full md:max-w-[250px] bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
