import React from 'react';
import { Link } from 'react-router-dom';
import './asideButton.css';

const AsideButton = ({ to, onClick, children, currentPage }) => {
  const isActive = currentPage === to;
  const buttonClassName = isActive ? "active containersidebarsection-text" : "containersidebarsection-text";

  return (
    <Link to={to} className={buttonClassName} onClick={onClick}>
      <span>{children}</span>
    </Link>
  );
};

export default AsideButton;
