export default function Course() {
    return (
        <div className="max-w-sm rounded-md shadow-lg bg-white overflow-hidden">
            <div className="absolute mt-3 ml-3 bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
                Marketing
            </div>

            <img src="course.png" alt="Graphic Design Course" className="w-full h-60 object-cover" />

            <div className="p-4">
                <div className="flex items-center text-gray-500 text-sm space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12l2 2 4-4m1 9H5a2 2 0 01-2-2V7a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2z" />
                        </svg>
                        <span>6 Lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>12h 30m</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>285 Students</span>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 leading-tight my-3">
                    Bigener Adobe Illustrator for Graphic Design
                </h3>

                <div className="flex items-center space-x-1 text-yellow-400 mb-3">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.686a1 1 0 00.95.69h3.863c.969 0 1.371 1.24.588 1.81l-3.125 2.27a1 1 0 00-.364 1.118l1.2 3.686c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.125 2.27c-.784.57-1.838-.197-1.539-1.118l1.2-3.686a1 1 0 00-.364-1.118L3.047 9.113c-.783-.57-.38-1.81.588-1.81h3.863a1 1 0 00.95-.69l1.2-3.686z" />
                    </svg>
                    <span className="text-sm text-gray-600">(17)</span>
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center space-x-2">
                        <img className="w-6 h-6 rounded-full object-cover" src="avatar.png" alt="Instructor" />
                        <span className="text-sm text-gray-700 font-medium">Eduvalt</span>
                    </div>
                    <span className="text-indigo-600 font-bold">Free</span>
                </div>
            </div>
        </div>
    )
}
