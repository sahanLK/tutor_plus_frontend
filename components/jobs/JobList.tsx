'use client';

import api from "@/lib/axios/axios";
import { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import { PiCoins } from "react-icons/pi";
import { RiCoinFill } from "react-icons/ri";


type JobType = { id: number, title: string, content: string }

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            try {
                setLoading(true);
                const { data } = await api.get('/posts');
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

    if (loading) return <div className="min-h-100 mt-40"><Spinner size="12" color={""} /></div>;

    return (
        <>
            {jobs.map((job: JobType) => (
                <div className="px-10 py-6 shadow flex items-center bg-white rounded-lg mb-5" key={job.id}>
                    <div>
                        <Link href={`/jobs/${job.id}`}><h1 className="text-lg pb-3 underline">{job.title}</h1></Link>
                        <p className="text-sm">{job.content}</p>
                    </div>
                    <div className="ml-auto">
                        <RiCoinFill color="#e6c300" className="mx-auto" size={30} />
                        <p className="text-stone-500 text-sm text-center">50 coins</p>
                    </div>
                </div>
            ))}
        </>
    )
}