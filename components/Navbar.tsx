'use client';

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store/store";

const Navbar = () => {
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    console.log("Auth State: ", loggedIn);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 left-0 w-full bg-gray-100">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-1">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800">
                        <Link href="/"><Image src={Logo} alt="Logo" width={150} height={80} /></Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 tracking-normal text-stone-800">
                        {loggedIn ? (
                            <>
                            <Link href="/auth/logout" className="rounded-full mr-8 py-2">Logout</Link>
                            <Link href="/profile" className="rounded-full mr-8 py-2">Profile</Link>
                            </>
                        ): (
                            <>
                            <Link href="/auth/login" className="rounded-full mr-8 py-2">Login</Link>
                            <Link href="/auth/register" className="text-white bg-blue-600 rounded-full px-5 py-2 hover:bg-blue-900">Sign Up</Link>
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
