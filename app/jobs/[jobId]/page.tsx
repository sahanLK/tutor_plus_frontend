'use client';

import api from "@/lib/axios/axios";
import { AxiosError } from "axios";
import { use, useEffect, useState } from "react";

type PageProps = {
    params: Promise<{ jobId: string }>
}

export default function JobPostDetails({ params }: PageProps) {
    const { jobId } = use(params);
    const [post, setPost] = useState({
        id: null,
        title: "",
        content: "",
        applicants: [],
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
        const res = await api.get(`/posts/apply/${post.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            }
        });
        console.log(res)
    }

    return (
        <div className="container mx-auto min-h-screen my-20">
            <h2 className="text-xl text-stone-700 mb-10">Title: {post.title}</h2>
            <div>
                {post.content}
            </div>
            <div className="mt-10">
                <h1 className="text-xl text-stone-600 mb-5">Applicants</h1>
                {post.applicants.map(applicant => (
                    <div key={applicant.id}>
                        <h2>{applicant.first_name} {applicant.last_name}</h2>
                    </div>
                ))}
            </div>
            <button className="mt-20 px-5 py-2 bg-blue-800 text-white rounded" onClick={applyJob}>Apply</button>
        </div>
    )
}
