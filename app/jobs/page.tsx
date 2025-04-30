'use client';

import api from "@/lib/axios/axios";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"

type JobType = {
    id: number,
    title: string,
    content: string,

}

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true);
                const { data } = await axios.get('http://localhost:8000/posts', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setJobs(data.posts);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        
        fetchJobs();
    }, []);

    async function applyJob(jobId: number) {
        setDisabled(true);
        const res = await api.get(`/posts/apply/${jobId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
        });
        setDisabled(false);
    }

    console.log(jobs);

    if (loading) {
        return <h2>Loading</h2>
    }

    return (
        <div className="min-h-screen mx-auto container mt-10 space-y-5">
            <h1 className="text-3xl mb-10">Find Tutor Jobs</h1>

            <div className="block">
                <input type="search" className="border-1 border-stone-700" />
            </div>

            {jobs.map((job: JobType) => (
                <div className="px-10 py-6 shadow flex items-center" key={job.id}>
                    <div>
                        <Link href={`/jobs/${job.id}`}><h1 className="text-xl pb-3 underline">{job.title}</h1></Link>
                        <p>{job.content}</p>
                    </div>
                    <div className="ml-auto">
                        <button
                            className={`px-5 py-2 rounded text-white ${disabled ? 'bg-blue-50' : 'bg-blue-700'}`}
                            disabled={disabled} onClick={(e) => applyJob(job.id)}>
                            Apply
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}