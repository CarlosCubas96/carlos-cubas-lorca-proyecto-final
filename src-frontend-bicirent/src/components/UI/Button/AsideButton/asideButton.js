import React from 'react';
import { Link } from 'react-router-dom';
import './asideButton.css';
import Icon from '../../icon/icon';

const AsideButton = ({ to, children, icon, style }) => {
  return (
    <Link to={to} className={"containersidebarsection-containerpanelmenusection"} style={style}>
      <Icon name={icon} />
      <div className="containersidebarsection-containermenusectiontext">
        <span>{children}</span>
      </div>
    </Link>
  );
};

export default AsideButton;
