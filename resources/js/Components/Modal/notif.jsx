import React from "react";

function NotificationModal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Notification</h2>
                    <button onClick={onClose} className="text-gray-500">
                        &times;
                    </button>
                </div>
                <p className="mt-4">{message}</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationModal;
