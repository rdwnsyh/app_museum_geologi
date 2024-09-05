import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Combobox = ({ name, value, onChange, options, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelect = (selectedValue) => {
        onChange({ target: { name, value: selectedValue } });
        setIsOpen(false);
        setSearchTerm('');
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative">
            <input
                type="text"
                value={searchTerm || value}
                onClick={() => setIsOpen(!isOpen)}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input border border-gray-300 rounded-md p-2 w-full"
                placeholder="Select an option"
            />
            {isOpen && (
                <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(option => (
                            <li
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500">No options</li>
                    )}
                </ul>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

Combobox.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,
    error: PropTypes.string,
};

export default Combobox;
