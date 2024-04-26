import React from 'react';
import './authButtom.css';
import { Link } from 'react-router-dom';

const AuthButtom = ({ to, loading, children, onClick, className }) => {


    return to ? (
        <Link to={to}
            className={className}
        >
            <span className="login-text14">{children}</span>

        </Link>
    ) : (
        <button
            className={className}
            onClick={onClick}
            disabled={loading}
        >
            <span className="login-text14">{children}</span>
            {loading && (
                <span className="spinner-border spinner-border-sm"></span>
            )}
        </button>
    );
};

export default AuthButtom;
