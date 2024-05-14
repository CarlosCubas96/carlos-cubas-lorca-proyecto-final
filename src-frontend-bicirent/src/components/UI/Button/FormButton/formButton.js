import React from 'react';
import { Link } from 'react-router-dom';
import './formButton.css';

const FormButton = ({ to, onClick, children, color, disabled }) => {
    const buttonStyle = {
        backgroundColor: color
    };

    if (to) {
        return (
            <Link to={to} className="formButton" style={buttonStyle} disabled={disabled}>
                <span className="formButton-text">{children}</span>
            </Link>
        );
    } else {
        return (
            <button onClick={onClick} className="formButton" style={buttonStyle} disabled={disabled}>
                <span className="formButton-text">{children}</span>
            </button>
        );
    }
};

export default FormButton;
