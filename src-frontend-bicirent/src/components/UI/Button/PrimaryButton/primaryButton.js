import React from 'react';
import { Link } from 'react-router-dom';
import './primaryButton.css'; 

const PrimaryButton = ({ to, onClick, children, color }) => {
    const buttonStyle = {
        backgroundColor: color
    };

    if (to) {
        return (
            <Link to={to} className="primaryButton" style={buttonStyle}>
                <span className="primaryButton-text">{children}</span>
            </Link>
        );
    } else {
        return (
            <button onClick={onClick} className="primaryButton" style={buttonStyle}>
                <span className="primaryButton-text">{children}</span>
            </button>
        );
    }
};

export default PrimaryButton;
