import React from 'react';
import { Link } from 'react-router-dom';

const NoPermissionPage = () => {
  return (
    <div>
      <h1>Acceso Denegado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <Link to="/">Volver al Inicio</Link>
    </div>
  );
};

export default NoPermissionPage;
