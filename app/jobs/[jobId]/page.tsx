'use client';

import api from "@/lib/axios/axios";
import { AxiosError } from "axios";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import avatar from "@/public/avatar.png";
import Modal from "@/components/Modal";

type PageProps = { params: Promise<{ jobId: string }> }
type JobApplicationType = { id: number, description: string, user: { first_name: string, last_name: string, profile_image: string } }

type PostType = {
    id: number | null,
    title: string,
    content: string,
    job_applications: Array<JobApplicationType>,
    author: boolean,
    owner: { first_name: string, last_name: string, profile_image: string | null, }
    applied: boolean,
    subjects: [{ id: number, name: string }],
}

export default function JobPostDetails({ params }: PageProps) {
    const { jobId } = use(params);
    const [activeTab, setActiveTab] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [post, setPost] = useState<PostType>({
        id: null,
        title: "",
        content: "",
        job_applications: [],
        author: false,
        applied: false,
        owner: { first_name: "", last_name: "", profile_image: null },
        subjects: [{ id: 0, name: "" }]
    });
    const jobDescriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                const { data } = await api.get(`/posts/${jobId}`);
                setPost(data);
                console.log(data)
            } catch (err) {
                const error = err as AxiosError;
                console.log(error);
            }
        }

        fetchPost();
    }, []);

    async function openModel() {
        setShowModal(true);
    }

    async function applyJob() {
        try {
            const requestBody = { job_post_id: post.id, description: jobDescriptionRef.current?.value }
            console.log("Applying for the Job with: ", requestBody);
            const resp = await api.post(`/posts/apply/${post.id}`, requestBody);

            if (resp.status === 200) {
                console.log("Job application successful");
            }
        } catch (err) {
            const error = err as AxiosError;
            console.log(error.message);
        }
    }

    return (
        <>
            <Modal
                open={showModal}
                title={`Tell ${post.owner.first_name}, Why you are the best.`}
                onClose={setShowModal}
                closeBtnText="Close"
                submitBtnText="Submit"
                onSubmit={applyJob}
            >
            <div>
                <textarea
                    rows={10}
                    className="w-full p-3 border-1 border-stone-400 rounded focus:outline-0"
                    placeholder="Tell them why you are the best fit."
                    ref={jobDescriptionRef}
                />
            </div>
        </Modal >
            <div className="container mx-auto min-h-screen mt-15 mb-20">
                <div className="mb-10">
                    <h2 className="text-3xl text-stone-700 mb-4">{post.title}</h2>
                    <p className="text-stone-600">Posted By:&emsp;{post.owner.first_name} {post.owner.last_name}</p>
                </div>

                {/* Subjects */}
                {post.subjects.length > 0 && (
                    <div className="my-10 flex flex-wrap items-center gap-4 text-stone-500">
                        {post.subjects.map(subject => (
                            <span className="py-1 px-4 bg-stone-200 border-1 border-stone-300 rounded" key={subject.id}>{subject.name}</span>
                        ))}
                    </div>
                )}

                <button
                    className={`px-4 py-2 text-white rounded ${post.applied ? 'bg-gray-700' : 'bg-green-700 cursor-pointer'}`}
                    onClick={openModel}
                    disabled={post.applied}
                >
                    {post.applied ? 'Applied' : 'Apply'}
                </button>

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
                        post.job_applications.map((application: JobApplicationType) => (
                            <div key={application.id} className="flex items-center gap-4">
                                <Image src={application.user.profile_image ? application.user.profile_image : avatar} width={50} height={50} alt="" />
                                <h2 className="text-md text-stone-700">{application.user.first_name}&nbsp;{application.user.last_name}</h2>
                            </div>
                        ))
                    )}

                </div>
            </div>
        </>
    )
}
