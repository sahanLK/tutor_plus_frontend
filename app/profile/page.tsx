import { FaStar, FaRegStar, FaStarHalfAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export default function TeacherProfile() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">

            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Teacher Profile"
                    className="w-32 h-32 rounded-full object-cover border"
                />
                <div className="mt-4 md:mt-0 text-center md:text-left">
                    <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                    <p className="text-gray-600 text-sm">Expert in Mathematics & Science</p>
                    <div className="flex justify-center md:justify-start mt-2 text-yellow-500">
                        {[...Array(4)].map((_, i) => <FaStar key={i} />)}
                        <FaStarHalfAlt />
                        <FaRegStar />
                        <span className="ml-2 text-gray-600">(4.5/5 - 120 Reviews)</span>
                    </div>
                </div>
            </div>

            {/* About & Expertise */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
                <p className="text-gray-700 mt-2">
                    Passionate educator with 10+ years of experience in Mathematics and Science.
                    Dedicated to helping students achieve their academic goals with personalized learning strategies.
                </p>
            </div>

            {/* Subjects & Specializations */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Subjects I Teach</h2>
                <div className="flex flex-wrap mt-2">
                    {["Mathematics", "Physics", "Chemistry", "Algebra"].map((subject, i) => (
                        <span key={i} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2 mb-2">
              {subject}
            </span>
                    ))}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Student Reviews</h2>
                <div className="mt-4 space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-gray-700"><strong>Alice:</strong> "John is an amazing tutor! He makes learning so much fun."</p>
                        <div className="flex text-yellow-500 mt-1">
                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-gray-700"><strong>Bob:</strong> "Helped me a lot with calculus. Highly recommend!"</p>
                        <div className="flex text-yellow-500 mt-1">
                            {[...Array(4)].map((_, i) => <FaStar key={i} />)}
                            <FaStarHalfAlt />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact & Booking */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
                <div className="flex items-center mt-2 text-gray-700 space-x-4">
                    <FaEnvelope className="text-blue-500" />
                    <p>john.doe@example.com</p>
                </div>
                <div className="flex items-center mt-2 text-gray-700 space-x-4">
                    <FaPhone className="text-green-500" />
                    <p>+1 234 567 890</p>
                </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 text-center">
                <button className="bg-blue-600 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">
                    Book a Lesson
                </button>
            </div>

        </div>
    );
}
