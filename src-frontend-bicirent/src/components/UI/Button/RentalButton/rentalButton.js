import React from 'react';
import { Link } from 'react-router-dom';
import './rentalButton.css';

const RentalButton = ({ to, onClick, children, color, textColor }) => {
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

            <Link to={to} className="view-catalog-user-containerbuttomcatalog" style={buttonStyle}>
                <div className="view-catalog-user-containerbuttomtext2">
                    <div className="view-catalog-user-buttomtext2">
                        <span className="view-catalog-user-text054" style={spanStyle}>
                            <span>{children}</span>
                        </span>
                    </div>
                </div>
            </Link>

        );
    } else {
        return (
            <button onClick={onClick} className="view-catalog-user-containerbuttomcatalog" style={buttonStyle}>
                <div className="view-catalog-user-containerbuttomtext2">
                    <div className="view-catalog-user-buttomtext2">
                        <span className="view-catalog-user-text054" style={spanStyle}>
                            <span>{children}</span>
                        </span>
                    </div>
                </div>
            </button>

        );
    }
};

export default RentalButton;
