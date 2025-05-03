import JobList from "@/components/jobs/JobList";


export default async function JobsPage() {
    return (
        <div className="min-h-screen mx-auto container mt-10 space-y-5">
            <h1 className="text-3xl mb-10">Find Tutor Jobs</h1>

            <div className="block">
                <input type="search" className="border-1 border-stone-700"/>
            </div>
            <JobList/>
        </div>
    )
}