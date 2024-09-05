// TextArea.jsx
import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ name, value, onChange, error, placeholder, rows = 4, className }) => (
    <div className={`relative ${className}`}>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    className: PropTypes.string,
};

export default TextArea;
