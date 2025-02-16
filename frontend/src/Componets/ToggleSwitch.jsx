import React from "react";

const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer space-x-2">
      <span className="text-sm font-medium">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${
          checked ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
