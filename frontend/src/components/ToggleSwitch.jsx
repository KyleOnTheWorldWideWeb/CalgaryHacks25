import React from "react";
import { Switch } from "@headlessui/react";

const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between w-full px-1 py-1 ">
      <span className="text-sm font-medium pr-2">{label}</span>
      <Switch
        checked={checked}
        onChange={onChange}
        className={`group relative inline-flex gap-4 h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          ${
            checked ? "bg-gray-900" : "bg-gray-200"
          } transition-colors duration-200 ease-in-out 
          focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2`}
      >
        <span className="sr-only">Toggle {label}</span>
        <span
          className={`pointer-events-none relative inline-block size-5 transform rounded-full bg-white shadow ring-0 
          transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        >
          {/* Off Icon */}
          <span
            aria-hidden="true"
            className={`absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in 
            ${checked ? "opacity-0" : "opacity-100"}`}
          >
            <svg
              fill="none"
              viewBox="0 0 12 12"
              className="size-3 text-gray-900"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {/* On Icon */}
          <span
            aria-hidden="true"
            className={`absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in 
            ${checked ? "opacity-100" : "opacity-0"}`}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 12 12"
              className="size-3 text-gray-900"
            >
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </span>
      </Switch>
    </div>
  );
};

export default ToggleSwitch;
