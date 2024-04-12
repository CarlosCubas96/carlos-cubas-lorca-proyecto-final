import React from 'react';
import { IconContext } from 'react-icons';
import { icons } from '../../../common/icon-utils'; 

const Icon = ({ name, size = '24px', color = 'black' }) => {
  const IconComponent = icons[name]; 

  if (!IconComponent) {
    console.error(`Icon '${name}' not found.`);
    return null;
  }

  return (
    <IconContext.Provider value={{ size, color }}>
      <IconComponent />
    </IconContext.Provider>
  );
};

export default Icon;
