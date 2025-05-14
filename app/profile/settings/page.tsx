'use client'

import useFetch from '@/hooks/useFetch';
import React, { useState } from 'react';
import { CiCamera } from 'react-icons/ci';


type ProfileDataType = {
    first_name: string,
    last_name: string,
    age: number,
    email: string,
    // profile_image: File,
}


export default function ProfileSettings() {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const { data, error, loading } = useFetch('/api/users/account-details');
    const [profileData, setProfileData] = useState<ProfileDataType>({
        first_name: "",
        last_name: "",
        age: 0,
        email: "",
        // profile_image: 
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setProfileImage(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Submit logic here
        // console.log({ profileImage, firstName, lastName, email })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
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
                                value={profileData.first_name}
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
                                value={profileData.last_name}
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
                            value={profileData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full min-w-[300px] max-w-[500px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Save Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
