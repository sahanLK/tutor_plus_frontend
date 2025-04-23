'use client';

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

const Navbar = () => {
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    console.log("Auth State: ", loggedIn);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 left-0 w-full bg-gray-100 shadow">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-1">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800">
                        <Link href="/"><Image src={Logo} alt="Logo" width={150} height={80} /></Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 tracking-normal text-stone-800">
                        <Link href="/jobs" className="mr-8 py-2 px-4 bg-blue-700 rounded text-white">Find Jobs</Link>
                        {loggedIn ? (
                            <>
                                <button>
                                    <Image src="/avatar.png" alt="profile" width={40} height={40} />
                                </button>
                                    <ul className="absolute right-0 mt-15 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                                        <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                                        <Link href="/auth/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
                                    </ul>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login" className="rounded border-1 border-gray-300 mr-5 px-7 py-3 bg-white text-sm">Login</Link>
                                <Link href="/auth/register" className="text-white bg-blue-600 rounded px-7 py-3 hover:bg-blue-900 text-sm font-bold">Sign Up</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden shadow-md p-4">
                    <Link href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 py-2">Login</Link>
                    <Link href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 py-2">Sign Up</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
