import React from "react";
import Input from "react-validation/build/input";
import PropTypes from "prop-types";
import "./editFormInput.css";

const EditFormInput = ({ label, type, placeholder, name, value, onChange, validations, disabled }) => {

    const inputClassName = disabled ? 'edit-containerinput disabled' : 'edit-containerinput';

    return (
        <div className='edit-containersectioninput'>
            <div className="edit-containermaininput">
                <div className="edit-containersectionlabel">
                    <span className="edit-text04">
                        <span>{label}</span>
                    </span>
                </div>

                <Input
                    type={type}
                    placeholder={placeholder}
                    className={inputClassName}
                    name={name}
                    value={value}
                    onChange={onChange}
                    validations={validations}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

EditFormInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    validations: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default EditFormInput;
