// Modal component
import React from "react";

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full">
                {" "}
                {/* Adjusted width */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500">
                        &times;
                    </button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
