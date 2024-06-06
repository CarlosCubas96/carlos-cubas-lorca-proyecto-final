import React from 'react';
import { Link } from 'react-router-dom';
import './formButton.css';

const FormButton = ({ to, onClick, children, color, textColor, disabled }) => {
    const buttonStyle = {
        backgroundColor: color,
        color: textColor,
    };

    const spanStyle = {
        backgroundColor: color,
        color: textColor,
    };

    if (to) {
        return (
            <Link to={to} className="formButton" style={buttonStyle} disabled={disabled}>
                <span style={spanStyle} className="formButton-text">{children}</span>
            </Link>
        );
    } else {
        return (
            <button onClick={onClick} className="formButton" style={buttonStyle} disabled={disabled}>
                <span className="formButton-text" style={spanStyle}>{children}</span>
            </button>
        );
    }
};

export default FormButton;
