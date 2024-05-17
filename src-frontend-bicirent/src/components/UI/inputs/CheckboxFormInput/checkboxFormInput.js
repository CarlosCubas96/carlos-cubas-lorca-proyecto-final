import React from "react";
import PropTypes from "prop-types";
import "./checkboxFormInput.css";

const CheckBoxFormInput = ({ label, name, options, selectedValue, onChange, disabled }) => {

    const handleChange = (value) => {
        onChange({
            target: {
                name: name,
                value: value
            }
        });
    };

    return (
        <div className='check-containersectioninput'>
            <div className="check-containermaininput">
                <div className="check-containersectionlabel">
                    <span className="check-text04">
                        <span>{label}</span>
                    </span>
                </div>
                {options.map(option => (
                    <div className="form-check" key={option.value}>
                        <input
                            className="form-check-input"
                            type="radio"
                            id={option.value}
                            name={name} // Usa el mismo nombre para todos los radio buttons
                            value={option.value}
                            checked={option.value === selectedValue}
                            onChange={() => handleChange(option.value)}
                            disabled={disabled}
                        />
                        <label className="form-check-label" htmlFor={option.value}>
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

CheckBoxFormInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired, // Agrega PropTypes para el nombre del campo
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired,
    selectedValue: PropTypes.string, // Ahora se define como opcional
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default CheckBoxFormInput;
