import { Star } from "lucide-react";
import { useState } from "react";


type PropTypes = {
    totalStars: number,
    value: number,
    onChange: (index: number) => void,
}

export default function ({ totalStars = 5, value = 0, onChange }: PropTypes) {
    const [hovered, setHovered] = useState(0);

    const handleClick = (index: number) => {
        if (onChange) {
            onChange(index + 1);
        }
    };

    return (
        <div className="flex items-center space-x-1">
            {Array.from({ length: totalStars }).map((_, index) => {
                const filled = hovered != null ? index <= hovered : index < value;
                return (

                    <Star
                        key={index}
                        className={`w-4 h-4 cursor-pointer transition-colors duration-150 ${filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        // onMouseEnter={() => setHovered(index)}
                        // onMouseLeave={() => setHovered(0)}
                        onClick={() => handleClick(index)}
                    />

                );
            })}
            <span className="text-sm pl-4">(4.5)</span>
            <span className="text-xs text-stone-600 pl-2 underline cursor-pointer">180 reviews</span>

        </div>
    );
};