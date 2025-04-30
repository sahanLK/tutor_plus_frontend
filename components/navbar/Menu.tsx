'use client';

import { RootState } from "@/lib/store/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegBell } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdBrightness6, MdOutlineLocalGroceryStore } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import ToggleActiveRole from "./ToggleActiveRole";


export default function Menu() {
    const loggedIn = useSelector((state: RootState) => state.auth.token ? true : false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        // Cleanup function
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {loggedIn ? (
                <>
                    <a className="my-auto"><MdBrightness6 className="text-stone-700" size={20} /></a>
                    <a className="my-auto"><FaRegBell className="text-stone-700" size={20} /></a>
                    <a className="my-auto"><MdOutlineLocalGroceryStore className="text-stone-700" size={22} /></a>
                    <button className="my-auto ml-2" onClick={() => setMenuOpen(!menuOpen)}>
                        <Image src="/avatar.png" alt="profile" width={50} height={50} />
                    </button>
                </>
            ) : (
                <>
                    <Link href="/auth/login" className="rounded border-1 border-gray-300 mr-5 px-7 py-3 bg-white text-sm">Login</Link>
                    <Link href="/auth/register" className="text-white bg-blue-600 rounded px-7 py-3 hover:bg-blue-900 text-sm font-bold">Sign Up</Link>
                </>

            )}

            {menuOpen && (
                <ul className="dropdown-menu absolute right-5 mt-75 py-3 w-55 bg-white border border-gray-200 text-stone-600 rounded-md shadow-lg z-10" ref={dropdownRef}>
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

                    <ToggleActiveRole />
                </ul>
            )}
        </>
    )
}