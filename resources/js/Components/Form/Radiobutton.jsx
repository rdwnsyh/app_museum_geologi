// components/RadioButton.jsx
import React from "react";

const RadioButton = ({ name, options, selectedValue, onChange, error }) => {
    return (
        <div>
            {options.map((option) => (
                <label key={option.value} className="block">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={onChange}
                        className="mr-2"
                    />
                    {option.label}
                </label>
            ))}

            {/* Tampilkan pesan error jika ada */}
            {error && <div className="text-red-500 mt-1">{error}</div>}
        </div>
    );
};

export default RadioButton;
