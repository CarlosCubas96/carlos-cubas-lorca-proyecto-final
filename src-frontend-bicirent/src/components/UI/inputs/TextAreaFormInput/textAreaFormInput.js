import React from "react";
import PropTypes from "prop-types";
import "./textAreaFormInput.css";

const TextAreaFormInput = ({ label, placeholder, name, value, onChange, validations, disabled }) => {
    const inputClassName = disabled ? 'select-containerinput disabled' : 'select-containerinput';

    return (
        <div className='select-containersectioninput'>
            <div className="select-containermaininput">
                <div className="select-containersectionlabel">
                    <span className="select-text04">
                        <span>{label}</span>
                    </span>
                </div>

                <textarea
                    placeholder={placeholder}
                    className={inputClassName}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    rows="4" // Ajusta el número de filas según sea necesario
                />
            </div>
        </div>
    );
};

TextAreaFormInput.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    validations: PropTypes.array,
    disabled: PropTypes.bool.isRequired,
};

export default TextAreaFormInput;
