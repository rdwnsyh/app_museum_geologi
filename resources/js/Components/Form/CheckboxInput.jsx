import React from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = ({ label, name, ...props }) => {
    return (
        <label className="flex items-center select-none" htmlFor={name}>
            <input
                id={name}
                name={name}
                type="checkbox"
                className="mr-2 form-checkbox rounded text-indigo-600 focus:ring-indigo-600"
                {...props}
            />
            <span className="text-sm">{label}</span>
        </label>
    );
};

CheckboxInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
};

export default CheckboxInput;
