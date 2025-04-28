'use client';

import api from "@/lib/axios/axios";
import { AxiosError } from "axios";
import { useState } from "react"

export default function CreateJobPage() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
        } catch(err) {
            const error = err as AxiosError;
        }
    }

    return (
        <div className="container mx-auto min-h-screen mt-20">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text" placeholder="Title" name="title" onChange={handleChange}
                    className="block border-1 border-stone-400 py-1 px-3"
                />
                <input
                    type="textarea" placeholder="Describe your requirements" name="content" onChange={handleChange}
                    className="block border-1 border-stone-400 py-1 px-3"
                />
                <input 
                    type="submit" value="Post Job" 
                    className="px-4 py-1 bg-blue-700 text-white mt-5 cursor-pointer"
                />
            </form>
        </div>
    )
}