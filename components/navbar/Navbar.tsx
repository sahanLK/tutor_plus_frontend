'use client';

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { FaRegBell } from "react-icons/fa";
import { MdBrightness6, MdOutlineLocalGroceryStore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { RiShutDownLine } from "react-icons/ri";
import { AxiosError } from "axios";
import { setActiveRole } from "@/lib/store/UiConfigSlice";
import { useRouter } from "next/navigation";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { setLoggedOut } from "@/lib/store/authSlice";
import api from "@/lib/axios/axios";


const Navbar = () => {
    const loggedIn = useSelector((state: RootState) => state.auth.token);
    const activeRole = useSelector((state: RootState) => state.config.activeRole);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    console.log("Auth State: ", loggedIn);
    const [isOpen, setIsOpen] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        // Cleanup function
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function toggleActiveRole() {
        const newRole = (activeRole === "student") ? 'teacher' : 'student';

        try {
            const resp = await api.get(`/users/change-role?role=${newRole}`);

            if (resp.status == 200) {
                dispatch(setActiveRole({ activeRole: newRole }));
                window.location.href = "/dashboard";  // if role change successful, reload the page to refresh the token 
            }

        } catch (err) {
            const error = err as AxiosError;
            console.log(error.message);
            dispatch(setLoggedOut())
            router.push("/auth/login");
        }
    }

    return (
        <nav className="sticky top-0 left-0 w-full px-5 bg-gray-100 shadow">
            <div className="w-full mx-auto  py-1">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800">
                        <Link href="/"><Image src={Logo} alt="Logo" width={200} height={100} /></Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 tracking-normal text-stone-800">
                        {/* <span className="mr-20 py-2 my-auto px-5 flex items-center cursor-pointer">
                            Explore <ChevronDown className="pl-2" />
                        </span> */}
                        {/* {activeRole == 'teacher' ? (
                            <Link href="/jobs" className="mr-20 py-2 my-auto px-5 border-1 bg-white text-sm border-stone-400">
                                Find Jobs
                            </Link>
                        ) : (
                            <Link href="/jobs/new" className="mr-20 py-2 my-auto px-5 bg-blue-700 rounded text-white">
                                Post a Job
                            </Link>
                        )} */}

                        {loggedIn ? (
                            <>
                                <a className="my-auto"><MdBrightness6 className="text-stone-700" size={20} /></a>
                                <a className="my-auto"><FaRegBell className="text-stone-700" size={20} /></a>
                                <a className="my-auto"><MdOutlineLocalGroceryStore className="text-stone-700" size={22} /></a>
                                <button className="my-auto ml-2 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                                    <Image src="/avatar.png" alt="profile" width={50} height={50} />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login"
                                    className="rounded border-1 border-stone-400 mr-5 px-7 py-3 bg-white text-sm">Login</Link>
                                <Link href="/auth/register"
                                    className="text-white bg-blue-600 rounded px-7 py-3 hover:bg-blue-900 text-sm font-bold">Sign
                                    Up</Link>
                            </>
                        )}
                    </div>

                    {menuOpen && (
                        <ul className="dropdown-menu absolute right-5 mt-75 py-3 w-55 bg-white border border-gray-200 text-stone-600 rounded-md shadow-lg z-10"
                            ref={dropdownRef}>
                            <li>
                                <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <CgProfile className="mr-3" size="18" />
                                    <span className="text-sm">Profile</span>
                                </Link>
                            </li>
                            <hr className="text-stone-300 my-2" />

                            <li>
                                <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <IoSettingsOutline className="mr-3" size="18" />
                                    <span className="text-sm">Settings</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/logout" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <RiShutDownLine className="mr-3" size="18" />
                                    <span className="text-sm">Logout</span>
                                </Link>
                            </li>
                            <hr className="text-stone-300 my-2" />

                            <li className="mt-5 mb-1">
                                <button onClick={toggleActiveRole}
                                    className="flex w-full items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    {activeRole === 'teacher' ? (
                                        <>
                                            <PiStudentBold className="mr-3" size="18" />
                                            <span className="text-sm">Student Profile</span>
                                        </>
                                    ) : (
                                        <>
                                            <GiTeacher className="mr-3" size="18" />
                                            <span className="text-sm">Teacher Profile</span>
                                        </>
                                    )}
                                </button>
                            </li>
                        </ul>
                    )}

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(prev => !prev)}
                            className="text-gray-700 dark:text-gray-300 focus:outline-none">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden shadow-md p-4">
                    <Link href="#"
                        className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 py-2">Login</Link>
                    <Link href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 py-2">Sign
                        Up</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
