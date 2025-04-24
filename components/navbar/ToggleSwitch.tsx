import React, { useState } from "react";


export default function ToggleSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ${enabled ? "bg-green-500" : "bg-gray-300"
          }`}
        onClick={() => setEnabled(!enabled)}
      >
        <div
          className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-5" : ""
            }`}
        />
      </button>
    </div>
  );
}
