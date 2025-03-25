import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 py-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-8 text-sm">

                {/* Company */}
                <div>
                    <h3 className="font-semibold text-gray-900">Company</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Leadership</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Products */}
                <div>
                    <h3 className="font-semibold text-gray-900">Products</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">Overview</a></li>
                        <li><a href="#">Droplets</a></li>
                        <li><a href="#">Kubernetes</a></li>
                        <li><a href="#">Managed Databases</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="font-semibold text-gray-900">Resources</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">Community Q&A</a></li>
                        <li><a href="#">Tutorials</a></li>
                        <li><a href="#">Marketplace</a></li>
                        <li><a href="#">Documentation</a></li>
                    </ul>
                </div>

                {/* Solutions */}
                <div>
                    <h3 className="font-semibold text-gray-900">Solutions</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">Website Hosting</a></li>
                        <li><a href="#">VPS Hosting</a></li>
                        <li><a href="#">Streaming</a></li>
                        <li><a href="#">Cloud Hosting</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold text-gray-900">Contact</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Sales</a></li>
                        <li><a href="#">Report Abuse</a></li>
                        <li><a href="#">System Status</a></li>
                    </ul>
                </div>

            </div>

            {/* Social Icons & Copyright */}
            <div className="mt-10 border-t pt-6 text-center">
                <div className="flex justify-center space-x-6 text-gray-500">
                    <FaFacebook className="w-5 h-5 cursor-pointer hover:text-gray-900" />
                    <FaTwitter className="w-5 h-5 cursor-pointer hover:text-gray-900" />
                    <FaInstagram className="w-5 h-5 cursor-pointer hover:text-gray-900" />
                    <FaGithub className="w-5 h-5 cursor-pointer hover:text-gray-900" />
                    <FaLinkedin className="w-5 h-5 cursor-pointer hover:text-gray-900" />
                    <FaYoutube className="w-5 h-5 cursor-pointer hover:text-gray-900" />
                </div>
                <p className="mt-4 text-gray-500 text-xs">© {new Date().getFullYear()} YourCompany. All rights reserved.</p>
            </div>
        </footer>
    );
}
