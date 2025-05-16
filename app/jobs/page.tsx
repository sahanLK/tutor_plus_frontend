import JobList from "@/components/jobs/JobList";


export default async function JobsPage() {
    return (
        <div className="min-h-screen mx-auto container mt-10 space-y-5">
            <h1 className="text-2xl mb-5 font-poppins text-stone-700">Find Tutor Jobs</h1>

            {/* Filter search */}
            <div className="flex items-center text-stone-600 gap-5 pb-5 mb-10 py-3 rounded-lg">
                <div>
                    <h3 className="text-xs pb-1">Subject</h3>
                    <input type="search" className="border-1 border-stone-500 focus:outline-0 px-4 py-1 rounded" />
                </div>
                <div>
                    <h3 className="text-xs pb-1">Location</h3>
                    <input type="search" className="border-1 border-stone-500 focus:outline-0 px-4 py-1 rounded" />
                </div>
                <div>
                    <h3 className="text-xs pb-1">Mode</h3>
                    <select className="text-sm border-1 border-stone-500 py-2 rounded px-5">
                        <option>Any</option>
                        <option>Online</option>
                        <option>Onsite</option>
                        <option>Hybrid</option>
                    </select>
                </div>
                <button className="rounded-sm px-4 py-2 mt-auto ml-5 bg-white border-1 border-stone-700 text-stone-700 text-sm cursor-pointer">Search</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-9 ">
                    <JobList />
                </div>
                <div className="lg:col-span-3 px-4">
                    <p className="text-sm">Advertisement</p>
                </div>
            </div>
        </div>
    )
}