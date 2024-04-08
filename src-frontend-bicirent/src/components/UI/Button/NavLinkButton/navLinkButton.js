import React from 'react';
import { Link } from 'react-router-dom';
import './navLinkButton.css';

const NavLinkButton = ({ to, children}) => {

    if (to) {
        return (
            <Link to={to} className="navLinkButton">
                <span className="navLinkButton-text">
                    <span >{children}</span>
                </span>
            </Link>
        );
    }
};

export default NavLinkButton;
