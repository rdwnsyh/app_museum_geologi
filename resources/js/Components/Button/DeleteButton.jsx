import React from "react";

export default function DeleteButton({ onDelete, children, ...props }) {
    return (
        <button
            className="text-red-600 focus:outline-none hover:underline"
            type="button"
            tabIndex={-1}
            onClick={onDelete}
            {...props}
        >
            {children}
        </button>
    );
}
