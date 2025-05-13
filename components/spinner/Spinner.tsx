
type PropTypes = { size: number, color: string }


export default function Spinner({ size = 8, color = 'white' }: PropTypes) {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className={`h-${size} w-${size} border-2 border-${color} border-t-transparent rounded-full animate-spin`}></div>
        </div>
    );
}
