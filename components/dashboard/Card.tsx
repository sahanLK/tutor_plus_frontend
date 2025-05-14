import Link from "next/link"
import { IconType } from "react-icons/lib"

type CardProps = {
    title: string,
    value: string,
    url: string,
    urlText: string
    Icon: IconType,
    iconColor: string,
    iconBgColor: string,
}

export default function DashBoardCard({ title, value, Icon, url, urlText, iconColor, iconBgColor }: CardProps) {
    console.log(iconColor, iconBgColor)
    return (
        <div className="py-4 px-6 bg-white shadow-lg w-[320px] text-stone-500 rounded font-[poppins] border-l-6" style={{borderColor: `${iconColor}`}}>
            <h2 className="text-sm tracking-wider">{title.toUpperCase()}</h2>
            <h1 className="text-2xl text-stone-600 font-semibold mt-5">{value}</h1>
            <div className="flex items-center">
                <Link href="/jobs" className="text-xs text-stone-500 underline">{urlText}</Link>
                <Icon className="rounded-lg ml-auto p-1 shadow-sm" style={{ color: `${iconColor}`, backgroundColor: `${iconBgColor}` }} size={45} />
            </div>
        </div>
    )
}
