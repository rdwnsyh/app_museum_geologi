import React from "react";

export default function SelectInput({
    name,
    error,
    className,
    options = [],
    ...props
}) {
    return (
        <select
            id={name}
            name={name}
            {...props}
            className={`form-select w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded ${
                error
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                    : ""
            } ${className}`}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
