export default function JobsPage() {
    const jobs = [
        {title: "Python Teacher Required", location: "Colombo", description: "Experienced Python tutor with Data Science and ML experience."},
        {title: "UI/UX Designer Required", location: "New York", description: "Experienced Python tutor with Data Science and ML experience."},
        {title: "Java Backend Engineer Required", location: "Manila", description: "Experienced Java Developer Required for a part time project"},
    ]
    return (
        <div className="min-h-screen mx-auto container mt-10 space-y-5">
            <h1 className="text-3xl mb-10">Find Tutor Jobs</h1>

            <div className="block">
                <input type="search" className="border-1 border-stone-700" />
            </div>

            {jobs.map(job => (
                <div className="px-10 py-6 shadow">
                    <h1 className="text-xl pb-3">{job.title}</h1>
                    <h3>Location: {job.location}</h3>
                    <p>{job.description}</p>
                </div>
            ))}
        </div>
    )
}