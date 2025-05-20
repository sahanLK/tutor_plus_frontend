// This page is only meant to be viewed by the Students to create a new job Post. 

'use client';

import Modal from "@/components/Modal";
import Spinner from "@/components/spinner/Spinner";
import useApi from "@/hooks/useApi";
import { X } from "lucide-react";
import React, { useState } from "react";

const options = ["Python", "Java", "React", "Spring Boot", "C++", "JavaScript"];
type PostCreateReq = {
    title: string,
    content: string,
    subjects: { name: string }[],
}

export default function CreateJobPage() {
    const [filtered, setFiltered] = useState<Set<string>>(new Set());
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [subjectInput, setSubjectInput] = useState("");
    const { statusCode, loading, error, fetchData } = useApi('/posts/', 'POST', false);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const submitData: PostCreateReq = { ...formData, subjects: Array.from(selected).map(item => ({ name: item })) };
        fetchData('/posts/', submitData);
        setModalOpen(true);
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
            {!loading && !error && (
                <Modal open={modalOpen} onClose={setModalOpen}>
                    {error ? error : 'Post Created'}
                </Modal>
            )}

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
                                <span onClick={() => removeFromSelected(item)} className=""><X size={20} /></span>
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
                            <li key={index + 1} onClick={() => addToSelected(item)} className="py-2 px-4 bg-stone-200">{item}</li>
                        ))}
                    </ul>
                </div>

                <button className="bg-blue-700 text-white py-2 px-6 rounded mt-10 cursor-pointer w-40">
                    {loading ? <Spinner size={5} color="red" /> : `Publish`}
                </button>
                {error && <span className="text-sm ml-8 text-red-500">Something went wrong: status ({statusCode})</span>}
            </form>
        </div>
    )
}