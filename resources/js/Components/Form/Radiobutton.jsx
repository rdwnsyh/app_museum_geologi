import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({ name, options, selectedValue, onChange, error }) => {
    return (
        <div>
            {options.map(option => (
                <div key={option.value} className="flex items-center mb-2">
                    <input
                        type="radio"
                        id={`${name}_${option.value}`}
                        name={name}
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={() => onChange(option.value)}
                        className="form-radio text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor={`${name}_${option.value}`} className="ml-2 text-sm">
                        {option.label}
                    </label>
                </div>
            ))}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

RadioButton.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,
    selectedValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default RadioButton;
