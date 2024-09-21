import React from "react";

export default function TextInput({
    name,
    className,
    error,
    value,
    onChange,
    ...props
}) {
    return (
        <input
            id={name}
            name={name}
            value={value} // Pastikan value diambil dari state
            onChange={onChange} // Tambahkan onChange untuk menangani perubahan
            {...props}
            className={`form-input w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded ${
                error
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                    : ""
            } ${className}`}
        />
    );
}
