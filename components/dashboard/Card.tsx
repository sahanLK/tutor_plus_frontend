import Link from "next/link"
import { ComponentType } from "react"
import { IconType } from "react-icons/lib"

type CardProps = {
    title: string,
    value: string,
    url: string,
    urlText: string
    Icon: IconType,
    bgColor: string,
}

export default function DashBoardCard({title, value, Icon, url, urlText , bgColor}: CardProps) {
    return (
        <div className={`card max-w-sm shadow py-8 px-10 bg-[${bgColor}]`}>
            <h2 className="">{title}</h2>
            <h1>{value}</h1>
            <Link href={url}>{urlText}</Link>
            <Icon className="" size="" />
        </div>
    )
}
