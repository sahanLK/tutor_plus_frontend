'use client';
import React, {useEffect, useState} from "react";
import {ChevronDown, ChevronRight} from "lucide-react";
import {usePathname} from "next/navigation";

type PropTypes = {
    title: string,
    Icon: React.ComponentType<{ size: number }>;
    iconSize: number,
    children: React.ReactNode,
};

export default function SidebarItem({title, Icon, iconSize, children}: PropTypes) {
    const pathName = usePathname();
    const [expanded, setExpanded] = useState(false);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
        async function expandIfCurrentUrl() {
            childrenArray.map((child) => {
                if (React.isValidElement(child)) {
                    const url = (child.props as { url?: string }).url;
                    if (url && pathName.startsWith(url)) {
                        setExpanded(true);
                        return
                    }
                }
            });
        }

        expandIfCurrentUrl();
    }, [pathName, childrenArray]);

    function handleExpansion(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        setExpanded(prev => !prev);
    }

    return (
        <>
            <section className="my-6 cursor-pointer" onClick={handleExpansion}>
                <span className="flex items-center">
                    <Icon size={iconSize}/>&emsp;{title}
                    {expanded ? <ChevronDown className="ml-auto" size={20}/> :
                        <ChevronRight className="ml-auto" size={20}/>}
                </span>

            </section>
            <ul className="mt-2 text-sm">
                {expanded && children}
            </ul>
        </>
    );
}
