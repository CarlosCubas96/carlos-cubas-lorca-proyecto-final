import React from "react";
import Input from "react-validation/build/input";
import PropTypes from "prop-types";
import "./loginFormInput.css";

const LoginFormInput = ({ label, type, placeholder, name, value, onChange, validations }) => {

    return (
        <div className='login-containersectioninput'>
            <div className="login-containermaininput">
                <div className="login-containersectionlabel">
                    <span className="login-text04">
                        <span>{label}</span>
                    </span>
                </div>

                <Input
                    type={type}
                    placeholder={placeholder}
                    className={'login-containerinput'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    validations={validations}
                />
            </div>
        </div>
    );
};

LoginFormInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    validations: PropTypes.array.isRequired,
};

export default LoginFormInput;
