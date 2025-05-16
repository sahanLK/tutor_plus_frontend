'use client';

import api from "@/lib/axios/axios";
import {AxiosError} from "axios";
import {X} from "lucide-react";
import React, {useState} from "react";

const options = ["Python", "Java", "React", "Spring Boot", "C++", "JavaScript"]

export default function CreateJobPage() {
    const [filtered, setFiltered] = useState<Set<string>>(new Set());
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [subjectInput, setSubjectInput] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const submitData = {...formData, subjects: Array.from(selected).map(item => ({name: item}))};
        console.log(submitData);

        try {
            const resp = await api.post('/posts/', submitData);
            console.log(resp.data);
        } catch (err) {
            const error = err as AxiosError;
            console.log(error.message);
        }
    }

    function filterOptions(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value.toLowerCase().trim();
        setSubjectInput(val);

        if (!val) {
            setFiltered(new Set());
            return;
        }
        setFiltered(new Set(options.filter(option => option.toLowerCase().trim().includes(val))));
    }

    function addToSelected(item: string) {
        setSelected(prev => new Set(prev).add(item));
        setSubjectInput("");

    }

    function removeFromSelected(item: string) {
        const items = selected;
        items.delete(item);
        setSelected(new Set(items));
    }

    return (
        <div className="container mx-auto min-h-screen mt-14">
            <h1 className="text-2xl text-stone-700 my-10">Let&apos;s find the best tutor for You.</h1>

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

                <h1 className="mt-10 text-lg text-stone-700">Select Your Subjects</h1>
                <div>
                    <div className="flex flex-wrap mb-5 gap-4">
                        {[...selected].map((item, index) => (
                            <span key={index}
                                  className="flex items-center text-stone-500 py-1 px-3 bg-stone-200 rounded border-1 border-stone-400">
                                <p className="pr-2">{item}</p>
                                <span onClick={() => removeFromSelected(item)} className=""><X size={20}/></span>
                            </span>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Select Subjects"
                        className="block border-1 border-stone-400 py-2 px-3 w-full rounded mt-5"
                        onChange={filterOptions}
                        value={subjectInput}
                    />
                    <ul>
                        {[...filtered].map((item, index) => (
                            <li key={index + 1} onClick={() => addToSelected(item)}
                                className="py-2 px-4 bg-stone-200">{item}</li>
                        ))}
                    </ul>
                </div>

                <input type="submit" value="Submit Post"
                       className="bg-blue-700 text-white py-2 px-4 rounded mt-10 cursor-pointer"/>
            </form>
        </div>
    )
}