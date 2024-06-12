import React from 'react';
import { Link } from 'react-router-dom';
import './asideButton.css';
import Icon from '../../icon/icon';

const AsideButton = ({ to, children, icon, style, onClick }) => {
  if (to) {
    return (
      <Link to={to} className="containersidebarsection-containerpanelmenusection" style={style}>
        <Icon name={icon} />
        <div className="containersidebarsection-containermenusectiontext">
          <span>{children}</span>
        </div>
      </Link>
    );
  } else if (onClick) {
    return (
      <button className="containersidebarsection-containerpanelmenusection" style={style} onClick={onClick}>
        <Icon name={icon} />
        <div className="containersidebarsection-containermenusectiontext">
          <span>{children}</span>
        </div>
      </button>
    );
  } else {
    return null; // Manejo de caso sin acción definida
  }
};

export default AsideButton;
