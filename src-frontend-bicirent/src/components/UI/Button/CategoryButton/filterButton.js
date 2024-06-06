import React from 'react';
import { Link } from 'react-router-dom';
import './filterButton.css';

const FilterButton = ({ to, onClick, children, color, textColor }) => {
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

            <Link to={to} className="view-catalog-user-containerbuttomfiltresshow" style={buttonStyle}>
                <div className="view-catalog-user-containerbuttomtext">
                    <div className="view-catalog-user-buttomtext">
                        <span className="view-catalog-user-text010" style={spanStyle}>
                            <span>{children}</span>
                        </span>
                    </div>
                </div>
            </Link>
        );
    } else {
        return (
            <button onClick={onClick} className="view-catalog-user-containerbuttomfiltresshow" style={buttonStyle}>
                <div className="view-catalog-user-containerbuttomtext">
                    <div className="view-catalog-user-buttomtext">
                        <span className="view-catalog-user-text010" style={spanStyle}>
                            <span>{children}</span>
                        </span>
                    </div>
                </div>
            </button>

        );
    }
};

export default FilterButton;
