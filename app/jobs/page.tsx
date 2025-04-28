'use client';

import api from "@/lib/axios/axios";
import Link from "next/link";
import { useEffect, useState } from "react"

type JobType = {
    id: number,
    title: string,
    content: string,

}

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    console.log(jobs);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const {data} = await api.get('/posts');
                setJobs(data.posts);
            } catch (err) {
                console.log(err);
            }
            
        }

        fetchJobs();
    }, [])

    return (
        <div className="min-h-screen mx-auto container mt-10 space-y-5">
            <h1 className="text-3xl mb-10">Find Tutor Jobs</h1>

            <div className="block">
                <input type="search" className="border-1 border-stone-700" />
            </div>

            {jobs.map((job: JobType) => (
                <div className="px-10 py-6 shadow" key={job.id}>
                    <Link href={`/jobs/${job.id}`}><h1 className="text-xl pb-3 underline">{job.title}</h1></Link>
                    {/* <h3>Location: {job.location}</h3> */}
                    <p>{job.content}</p>
                </div>
            ))}
        </div>
    )
}