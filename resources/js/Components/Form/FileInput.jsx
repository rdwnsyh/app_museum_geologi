import React, { useState, useRef, useEffect } from "react";

export default function FileInput({ name, error, onFileChange, existingFile }) {
    const fileInput = useRef(null);
    const [file, setFile] = useState(existingFile);

    useEffect(() => {
        // Set file jika ada file eksisting
        setFile(existingFile);
    }, [existingFile]);

    // Menangani klik tombol browse
    function handleBrowse() {
        fileInput.current.click();
    }

    // Menangani perubahan file
    function handleChange(e) {
        const selectedFile = e.currentTarget.files[0] || null;
        setFile(selectedFile); // Update file di state
        onFileChange(selectedFile); // Kirim file ke parent
    }

    // Menangani penghapusan file
    function handleRemove() {
        setFile(null); // Reset file di state
        onFileChange(null); // Kirim null ke parent
    }

    return (
        <div className="file-input">
            {/* Input file yang tersembunyi */}
            <input
                id={name}
                ref={fileInput}
                type="file"
                className="hidden"
                onChange={handleChange}
            />

            {/* Jika tidak ada file, tampilkan tombol browse */}
            {!file && (
                <div className="p-2">
                    <BrowseButton text="Pilih File" onClick={handleBrowse} />
                </div>
            )}

            {/* Jika ada file, tampilkan nama file dan tombol hapus */}
            {file && (
                <div className="flex items-center justify-between p-2">
                    <div className="flex-1 pr-1">
                        {typeof file === "string" ? (
                            <span>{file}</span> // Untuk file eksisting
                        ) : (
                            <>
                                {file.name}
                                {file.size && (
                                    <span className="ml-1 text-xs text-gray-600">
                                        ({(file.size / 1024).toFixed(2)} KB)
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                    <BrowseButton text="Hapus" onClick={handleRemove} />
                </div>
            )}

            {/* Tampilkan pesan error jika ada */}
            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
        </div>
    );
}

// Tombol untuk Browse atau Remove
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
