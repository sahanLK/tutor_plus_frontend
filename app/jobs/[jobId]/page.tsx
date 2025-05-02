'use client';

import api from "@/lib/axios/axios";
import { AxiosError } from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import avatar from "@/public/avatar.png";

type PageProps = { params: Promise<{ jobId: string }> }
type ApplicantType = { id: number, first_name: string, last_name: string, profile_image: string | null }

type PostType = {
    id: number | null,
    title: string,
    content: string,
    applicants: Array<ApplicantType>,
    author: boolean,
    owner: { first_name: string, last_name: string, profile_image: string | null, }
    applied: boolean,
}

export default function JobPostDetails({ params }: PageProps) {
    const { jobId } = use(params);
    const [activeTab, setActiveTab] = useState(1);
    const [post, setPost] = useState<PostType>({
        id: null,
        title: "",
        content: "",
        applicants: [],
        author: false,
        applied: false,
        owner: { first_name: "", last_name: "", profile_image: null }
    });

    useEffect(() => {
        async function fetchPost() {
            try {
                const { data } = await api.get(`/posts/${jobId}`);
                setPost(data);
            } catch (err) {
                const error = err as AxiosError;
                console.log(error);
            }
        }

        fetchPost();
    }, []);

    return (
        <div className="container mx-auto min-h-screen mt-15 mb-20">
            <div className="mb-10">
                <h2 className="text-3xl text-stone-700 mb-4">{post.title}</h2>
                <p className="text-stone-600">Posted By:&emsp;{post.owner.first_name} {post.owner.last_name}</p>
            </div>

            <div>
                <div className="flex items-center gap-3 text-stone-700 mb-10 border-b-1 border-stone-300">
                    <span
                        onClick={() => setActiveTab(1)}
                        className={`py-2 px-5 border-stone-300 text-md cursor-pointer ${activeTab == 1 ? 'border-1 rounded-t-lg bg-blue-700 text-white' : ''}`}
                    >Summary</span>
                    <span
                        onClick={() => setActiveTab(2)}
                        className={`py-2 px-5 border-stone-300 text-md cursor-pointer ${activeTab == 2 ? 'border-1 rounded-t-lg bg-blue-700 text-white' : ''}`}
                    >Applicants</span>
                </div>

                {activeTab == 1 && (
                    post.content
                )}

                {activeTab == 2 && (
                    post.applicants.map((applicant: ApplicantType) => (
                        <div key={applicant.id} className="flex items-center gap-4">
                            <Image src={applicant.profile_image ? applicant.profile_image : avatar} width={50} height={50} alt="" />
                            <h2 className="text-md text-stone-700">{applicant.first_name}&nbsp;{applicant.last_name}</h2>
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}
