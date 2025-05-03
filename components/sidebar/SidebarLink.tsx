'use client';

import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

type PropTypes = {
    title: string;
    url: string;
};

export default function SidebarLink({title, url}: PropTypes) {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [active, setActive] = useState(false);

    useEffect(() => {
        const fullPath = (searchParams.size === 0) ? pathName : `${pathName}?${searchParams.toString()}`;
        setActive(fullPath == url);
    }, [pathName, searchParams, url]);

    return (
        <Link href={url}>
            <li className={`pl-8 my-5 text-sm ${active ? 'text-white' : 'text-gray-300'}`}>
                -&emsp;{title}
            </li>
        </Link>
    );
}
