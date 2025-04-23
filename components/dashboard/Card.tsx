type CardProps = {
    title: string,
}

export default function DashBoardCard({title}: CardProps) {
    return (
        <div className="card max-w-sm shadow py-8 px-10">
            <h2 className="">{title}</h2>
        </div>
    )
}