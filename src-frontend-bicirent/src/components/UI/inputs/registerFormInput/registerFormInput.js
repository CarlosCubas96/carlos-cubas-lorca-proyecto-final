import React from "react";
import Input from "react-validation/build/input";
import PropTypes from "prop-types";
import "./registerFormInput.css";

const RegisterFormInput = ({ type, placeholder, name, value, onChange, validations }) => {

    return (
        <Input
            type={type}
            placeholder={placeholder}
            className={'login-containerinput'}
            name={name}
            value={value}
            onChange={onChange}
            validations={validations}
        />
    );
};

RegisterFormInput.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    validations: PropTypes.array.isRequired,
};

export default RegisterFormInput;
