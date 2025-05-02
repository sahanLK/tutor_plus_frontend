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
    subjects: [{ id: number, name: string }],
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
        owner: { first_name: "", last_name: "", profile_image: null },
        subjects: [{ id: 0, name: "" }]
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

    async function applyJob() {
        try {
            const resp = await api.get(`/apply/${post.id}`);

            if (resp.status === 200) {
                console.log("Job application successful");
            }
        } catch (err) {
            const error = err as AxiosError;
            console.log(error.message);
        }
    }

    return (
        <div className="container mx-auto min-h-screen mt-15 mb-20">
            <div className="mb-10">
                <h2 className="text-3xl text-stone-700 mb-4">{post.title}</h2>
                <p className="text-stone-600">Posted By:&emsp;{post.owner.first_name} {post.owner.last_name}</p>
            </div>

            {post.subjects.length > 0 && (
                <div className="my-10 flex flex-wrap items-center gap-4 text-stone-500">
                    {post.subjects.map(subject => (
                        <span className="py-1 px-4 bg-stone-200 border-1 border-stone-300 rounded" key={subject.id}>{subject.name}</span>
                    ))}
                </div>
            )}

            <button className="px-4 py-2 bg-green-700 text-white rounded cursor-pointer" onClick={applyJob}>Apply</button>

            <div className="mt-10">
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
