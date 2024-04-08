import React from 'react';
import { Link } from 'react-router-dom';
import './searchBoxButton.css';

const SearchBoxButton = ({ to, onClick, children, color }) => {
    const buttonStyle = {
        backgroundColor: color
    };

    if (to) {
        return (
            <Link to={to} className="searchBoxButton" style={buttonStyle}>
                <span className="searchBoxButton-text">{children}</span>
            </Link>
        );
    } else {
        return (
            <button onClick={onClick} className="searchBoxButton" style={buttonStyle}>
                <span className="searchBoxButton-text">{children}</span>
            </button>
        );
    }
};

export default SearchBoxButton;

