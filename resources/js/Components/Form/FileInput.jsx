import React, { useState, useRef, useEffect } from "react";

export default function FileInput({ name, error, onFileChange, existingFile }) {
    const fileInput = useRef(null);
    const [file, setFile] = useState(existingFile);

    useEffect(() => {
        setFile(existingFile);
    }, [existingFile]);

    // Menangani klik browse
    function handleBrowse() {
        fileInput.current.click();
    }

    // Menangani penghapusan file
    function handleRemove() {
        setFile(null);
        onFileChange(null); // Mengirimkan null jika file dihapus
    }

    // Menangani perubahan file
    function handleChange(e) {
        const selectedFile = e.currentTarget.files[0] || null;
        setFile(selectedFile);
        onFileChange(selectedFile);
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
                    <BrowseButton text="Pilih File" onClick={handleBrowse} />
                </div>
            )}
            {file && (
                <div className="flex items-center justify-between p-2">
                    <div className="flex-1 pr-1">
                        {file.name || "File sudah ada"}
                        {file.size && (
                            <span className="ml-1 text-xs text-gray-600">
                                ({(file.size / 1024).toFixed(2)} KB)
                            </span>
                        )}
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
