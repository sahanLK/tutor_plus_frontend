import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-blue-950 text-gray-300 pt-18 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">

                {/* Resources */}
                <div className="mx-auto">
                    <h3 className="font-semibold text-white">Resources</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Pricing & Plans</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div className="mx-auto">
                    <h3 className="font-semibold text-white">How it Works?</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">For Teachers</a></li>
                        <li><a href="#">For Students</a></li>
                        <li><a href="#">Report an Issue</a></li>
                    </ul>
                </div>

                {/* Solutions */}
                <div className="mx-auto">
                    <h3 className="font-semibold text-white">Stay Safe</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">Must Know</a></li>
                        <li><a href="#">Report Abuse</a></li>
                        <li><a href="#">Make a Complaint</a></li>
                    </ul>
                </div>

                {/* Help and Feedback */}
                <div className="mx-auto">
                    <h3 className="font-semibold text-white">Help and Feedback</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">Feedback</a></li>
                        <li><a href="#">Testimonials</a></li>
                    </ul>
                </div>
            </div>

            {/* Social Icons & Copyright */}
            <div className="mt-10 border-t pt-6 text-center">
                <div className="flex justify-center space-x-6 text-white">
                    <FaFacebook className="w-5 h-5 cursor-pointer hover:text-gray-200" />
                    <FaTwitter className="w-5 h-5 cursor-pointer hover:text-gray-200" />
                    <FaInstagram className="w-5 h-5 cursor-pointer hover:text-gray-200" />
                    {/* <FaGithub className="w-5 h-5 cursor-pointer hover:text-gray-200"/> */}
                    <FaLinkedin className="w-5 h-5 cursor-pointer hover:text-gray-200" />
                    {/* <FaYoutube className="w-5 h-5 cursor-pointer hover:text-gray-200"/> */}
                </div>
                <p className="mt-4 text-gray-200 text-xs"><strong>©</strong> {new Date().getFullYear()} TutorPlus. All rights reserved.</p>
            </div>
        </footer>
    );
}
