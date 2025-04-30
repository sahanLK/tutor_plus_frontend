'use client';

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";


const Navbar = () => {
    const activeRole = useSelector((state: RootState) => state.config.activeRole);
    
    return (
        <nav className="sticky top-0 left-0 w-full px-5 bg-gray-100 shadow">
            <div className="w-full mx-auto  py-1">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800">
                        <Link href="/"><Image src={Logo} alt="Logo" width={150} height={80} /></Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 tracking-normal text-stone-800">
                        {activeRole == 'teacher' ? (
                            <Link href="/jobs" className="mr-20 py-2 my-auto px-5 bg-blue-700 rounded text-white">Find Jobs</Link>
                        ) : (
                            <Link href="/jobs/new" className="mr-20 py-2 my-auto px-5 bg-blue-700 rounded text-white">Post a Job</Link>
                        )}

                        <Menu/>
                    </div>

                    

                    {/* Mobile Menu Button */}
                    {/* <div className="md:hidden">
                        <button onClick={() => setIsOpen(prev => !prev)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div> */}
                </div>
            </div>

            {/* Mobile Menu */}
            {/* {isOpen && (
                <div className="md:hidden shadow-md p-4">
                    <Link href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 py-2">Login</Link>
                    <Link href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 py-2">Sign Up</Link>
                </div>
            )} */}
        </nav>
    );
};

export default Navbar;
