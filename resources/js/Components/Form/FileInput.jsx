import React, { useState, useRef } from "react";
import { fileSize } from "@/utils"; // Pastikan path ini sesuai dengan struktur proyek Anda

export default function FileInput({ name, error, onChange }) {
    const fileInput = useRef(null);
    const [file, setFile] = useState(null);

    function handleBrowse() {
        fileInput.current.click();
    }

    function handleRemove() {
        setFile(null);
        if (onChange) onChange(null);
        // fileInput.current.value = ''; // Uncomment if needed
    }

    function handleChange(e) {
        const files = e.currentTarget.files;
        const selectedFile = files[0] || null;

        setFile(selectedFile);
        if (onChange) onChange(selectedFile);
    }

    return (
        <div
            className={`form-input w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded p-0 ${
                error
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                    : ""
            }`}
        >
            <input
                id={name}
                ref={fileInput}
                type="file"
                className="hidden"
                onChange={handleChange}
            />
            {!file && (
                <div className="p-2">
                    <BrowseButton text="Browse" onClick={handleBrowse} />
                </div>
            )}
            {file && (
                <div className="flex items-center justify-between p-2">
                    <div className="flex-1 pr-1">
                        {file.name}
                        <span className="ml-1 text-xs text-gray-600">
                            ({fileSize(file.size)})
                        </span>
                    </div>
                    <BrowseButton text="Remove" onClick={handleRemove} />
                </div>
            )}
        </div>
    );
}

function BrowseButton({ text, onClick, ...props }) {
    return (
        <button
            {...props}
            type="button"
            className="px-4 py-1 text-xs font-medium text-white bg-gray-600 rounded-sm focus:outline-none hover:bg-gray-700"
            onClick={onClick}
        >
            {text}
        </button>
    );
}
