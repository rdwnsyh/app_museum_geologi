// FieldGroup.jsx
import React from "react";

const FieldGroup = ({ label, name, children, error }) => {
    return (
        <div className="field-group">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            {children}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default FieldGroup;
