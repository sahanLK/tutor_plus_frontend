import Link from "next/link"
import { IconType } from "react-icons/lib"

type CardProps = {
    title: string,
    value: string,
    url1: string | null,
    urlText1: string | null,
    url2: string | null,
    urlText2: string | null,
    Icon: IconType,
    iconColor: string,
    iconBgColor: string,
}

export default function DashBoardCard({ title, value, Icon, url1, urlText1, iconColor, iconBgColor, url2, urlText2 }: CardProps) {
    console.log(iconColor, iconBgColor)
    return (
        <div className={`py-4 px-6 shadow-lg w-[320px] text-stone-500 rounded border-l-6 font-poppins`} style={{ borderColor: `${iconColor}` }}>
            <h2 className="text-sm tracking-wider">{title.toUpperCase()}</h2>
            <h1 className="text-xl font-semibold text-stone-500 mt-5">{value}</h1>
            <div className="flex items-center">
                {url1 && <Link href={url1} className="text-xs text-stone-500 underline">{urlText1}</Link>}
                {url2 && <Link href={url2} className="text-xs text-stone-500 underline">{urlText2}</Link>}
                <Icon className="rounded-lg ml-auto p-1 shadow-sm" style={{ color: `${iconColor}`, backgroundColor: `${iconBgColor}` }} size={40} />
            </div>
        </div>
    )
}
