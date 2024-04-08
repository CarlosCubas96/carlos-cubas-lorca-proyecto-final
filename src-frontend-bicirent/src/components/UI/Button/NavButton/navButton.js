import React from 'react';
import { Link } from 'react-router-dom';
import './navButton.css'; 

const NavButton = ({ to, onClick, children, color }) => {
    const buttonStyle = {
        backgroundColor: color
    };

    if (to) {
        return (
            <Link to={to} className="navButton" style={buttonStyle}>
                <span className="navButton-text">{children}</span>
            </Link>
        );
    } else {
        return (
            <button onClick={onClick} className="navButton" style={buttonStyle}>
                <span className="navButton-text">{children}</span>
            </button>
        );
    }
};

export default NavButton;
