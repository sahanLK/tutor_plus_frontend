'use client';

import api from "@/lib/axios/axios";
import {AxiosError} from "axios";
import Link from "next/link";
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";


type JobType = {
    id: number,
    title: string,
    content: string,
}

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchPosts() {
            try {
                setLoading(true);
                const {data} = await api.get('/posts');
                setJobs(data.posts);
            } catch (err) {
                const error = err as AxiosError;
                console.log(error.message)
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);


    if (loading) return <Spinner/>;

    return (
        <>
            {jobs.map((job: JobType) => (
                <div className="px-10 py-6 shadow flex items-center" key={job.id}>
                    <div>
                        <Link href={`/jobs/${job.id}`}><h1 className="text-xl pb-3 underline">{job.title}</h1></Link>
                        <p>{job.content}</p>
                    </div>
                    <div className="ml-auto">
                        {/* <button
                        className={`px-5 py-2 rounded text-white ${disabled ? 'bg-blue-50' : 'bg-blue-700'}`}
                        disabled={disabled} onClick={(e) => applyJob(job.id)}>
                        Apply
                    </button> */}
                    </div>
                </div>
            ))}
        </>
    )
}