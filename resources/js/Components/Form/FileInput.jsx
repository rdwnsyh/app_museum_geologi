import React, { useState, useRef, useEffect } from "react";

export default function FileInput({ name, error, onFileChange, existingFile }) {
    const fileInput = useRef(null);
    const [file, setFile] = useState(existingFile);

    useEffect(() => {
        if (existingFile) {
            setFile(existingFile);
        }
    }, [existingFile]);

    function handleBrowse() {
        fileInput.current.click();
    }

    function handleChange(e) {
        const selectedFile = e.currentTarget.files[0] || null;
        if (selectedFile) {
            setFile(selectedFile); // Update file in state
            onFileChange(selectedFile); // Send file to parent
        } else {
            setFile(null);
            onFileChange(null); // Send null to parent if no file is selected
        }
    }

    function handleRemove() {
        setFile(null); // Reset file in state
        onFileChange(null); // Send null to parent
    }

    return (
        <div className="file-input">
            <input
                id={name}
                ref={fileInput}
                type="file"
                className="hidden"
                onChange={handleChange}
                accept="application/pdf, image/*" // You can add allowed file types here
            />
            
            {!file ? (
                <div className="p-2">
                    <BrowseButton text="Pilih File" onClick={handleBrowse} />
                </div>
            ) : (
                <div className="flex items-center justify-between p-2">
                    <div className="flex-1 pr-1">
                        {typeof file === "string" ? (
                            <span>{file}</span>
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

            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
        </div>
    );
}

// Browse or Remove button
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
