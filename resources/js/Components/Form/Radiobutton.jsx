import React from "react";

const RadioButton = ({ id, name, value, checked, onChange, label, error }) => {
    return (
        <label className="block">
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="mr-2"
            />
            {label}
            {/* Tampilkan pesan error jika ada */}
            {error && <div className="text-red-500 mt-1">{error}</div>}
        </label>
    );
};

export default RadioButton;
