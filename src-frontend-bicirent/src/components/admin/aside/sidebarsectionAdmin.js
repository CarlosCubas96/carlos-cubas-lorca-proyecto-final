import React from 'react';
import { useLocation } from 'react-router-dom';  // Importar useLocation
import './sidebarsectionAdmin.css';
import AsideButton from '../../UI/Button/AsideButton/asideButton';

const SidebarsectionAdmin = () => {
  const location = useLocation();  // Obtener la ubicación actual

  // Función para determinar si el botón debe estar activo
  const isActive = (path) => location.pathname === path;

  return (
    <div className="containersidebarsection-containersidebarsection">
      <div className="containersidebarsection-containersidebarbr">
        <div className="containersidebarsection-containersidebarpanel">
          <div className="containersidebarsection-containersidebarpanelname">
            <span className="containersidebarsection-text">
              <h4>Admin</h4>
            </span>
          </div>
          <div className="containersidebarsection-containersidebarpanelmenu">
            {/* Aplicar estilos condicionales basados en la ruta */}
            <AsideButton 
              to="/admin" 
              icon="Home" 
              style={{ backgroundColor: isActive('/admin') ? '#38E078' : 'inherit' }}
            >
              Panel de administrador
            </AsideButton>

            <AsideButton 
              to="/admin/usuarios" 
              icon="Users" 
              style={{ backgroundColor: isActive('/admin/usuarios') ? '#38E078' : 'inherit' }}
            >
              Usuarios
            </AsideButton>

            <AsideButton 
              to="/bikes" 
              icon="Bici" 
              style={{ backgroundColor: isActive('/bikes') ? '#f0f0f0' : 'inherit' }}
            >
              Bicicletas
            </AsideButton>

            <AsideButton 
              to="/posts" 
              icon="Bell" 
              style={{ backgroundColor: isActive('/posts') ? '#f0f0f0' : 'inherit' }}
            >
              Publicaciones
            </AsideButton>

            <AsideButton 
              to="/rentals" 
              icon="Altavoz" 
              style={{ backgroundColor: isActive('/rentals') ? '#f0f0f0' : 'inherit' }}
            >
              Alquileres
            </AsideButton>
          </div>
        </div>
        <div className="containersidebarsection-containersidebarpanel2">
          <div className="containersidebarsection-containersidebarpanel2menu">
            <AsideButton to="#" icon="Question" >Soporte</AsideButton>
            <AsideButton to="#" icon="Logout" >Cerrar Sesión</AsideButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarsectionAdmin;
