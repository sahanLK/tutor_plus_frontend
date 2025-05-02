'use client';

import api from "@/lib/axios/axios";
import { AxiosError } from "axios";
import React, { useState } from "react";

const options = ["Python", "Java", "React", "Spring Boot", "C++", "JavaScript"]

export default function CreateJobPage() {
    const [filtered, setFiltered] = useState<Set<string>>(new Set());
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);

        try {
            const res = await api.post('/posts/', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            const data = await res.data;
            console.log(data);
        } catch (err) {
            const error = err as AxiosError;
        }
    }

    function filterOptions(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value.toLowerCase().trim();
        if (!val) {
            setFiltered(new Set());
            return;
        }
        setFiltered(new Set(options.filter(option => option.toLowerCase().trim().includes(val))));
    }

    return (
        <div className="container mx-auto min-h-screen mt-14">
            <h1 className="text-2xl text-stone-700 my-10">Let's find the best tutor for You.</h1>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
                <input
                    type="text" placeholder="Title" name="title" onChange={handleChange}
                    className="block border-1 border-stone-400 py-2 px-3 w-full rounded"
                />

                <h1 className="mt-10 text-lg text-stone-700">Describe Your Unique Requirements</h1>
                <textarea
                    placeholder="I'm looking for ..."
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={6}
                    className="block border-1 border-stone-400 py-2 px-3 w-full rounded"
                />

                <h1 className="mt-10 text-lg text-stone-700">Select the Subjects</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Select Subjects"
                        className="block border-1 border-stone-400 py-2 px-3 w-full rounded"
                        onChange={filterOptions}
                    />
                    <ul>
                        {[...filtered].map((item, index) => (
                            <li key={index+1}>{item}</li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>
    )
}