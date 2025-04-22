import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-blue-950 text-gray-300 pt-18 pb-10 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">

                {/* Resources */}
                <div>
                    <h3 className="font-semibold text-white">Resources</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Pricing & Plans</a></li>
                    </ul>
                </div>

                {/* Products */}
                <div>
                    <h3 className="font-semibold text-white">Products</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">Overview</a></li>
                        <li><a href="#">Product 1</a></li>
                        <li><a href="#">Product 2</a></li>
                        <li><a href="#">Product 3</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="font-semibold text-white">Resources</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">Community Q&A</a></li>
                        <li><a href="#">Tutorials</a></li>
                        <li><a href="#">Marketplace</a></li>
                        <li><a href="#">Documentation</a></li>
                    </ul>
                </div>

                {/* Solutions */}
                <div>
                    <h3 className="font-semibold text-white">Stay Safe</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">Report Abuse</a></li>
                        <li><a href="#">Make a Complaint</a></li>
                        <li><a href="#">Other</a></li>
                        <li><a href="#">Other 2</a></li>
                    </ul>
                </div>
            </div>

            {/* Social Icons & Copyright */}
            <div className="mt-10 border-t pt-6 text-center">
                <div className="flex justify-center space-x-6 text-white">
                    <FaFacebook className="w-5 h-5 cursor-pointer hover:text-gray-200" />
                    <FaTwitter className="w-5 h-5 cursor-pointer hover:text-gray-200" />
                    <FaInstagram className="w-5 h-5 cursor-pointer hover:text-gray-200" />
                    <FaGithub className="w-5 h-5 cursor-pointer hover:text-gray-200" />
                    <FaLinkedin className="w-5 h-5 cursor-pointer hover:text-gray-200" />
                    <FaYoutube className="w-5 h-5 cursor-pointer hover:text-gray-200" />
                </div>
                <p className="mt-4 text-gray-500 text-xs">© {new Date().getFullYear()} TutorPlus. All rights reserved.</p>
            </div>
        </footer>
    );
}
