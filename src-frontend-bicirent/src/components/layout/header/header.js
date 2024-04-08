import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import NavButton from '../../UI/Button/NavButton/navButton';
import PrimaryButton from '../../UI/Button/PrimaryButton/primaryButton';
import logoImg from '../../../assets/images/logos/logo.png';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-container__logo">

        <Link to="/" className="header-container__logo">
          <img
            src={logoImg}
            alt="header logo"
            className="header-logo"
          />
        </Link>
      </div>
      <div className="header-container__nav">
        <div className="header-container__nav-items">

          <NavButton to="/inicio" >Inicio</NavButton>
          <NavButton to="/inicio" >Alquila tu bici</NavButton>
          <NavButton to="/inicio" >Servicios</NavButton>
          <NavButton to="/inicio">Contáctanos</NavButton>
          <NavButton to="/inicio" >Sobre Nosotros</NavButton>

        </div>
        <div className="header-container__nav-buttons">

          <PrimaryButton to="/register" >Registrarse</PrimaryButton>
          <PrimaryButton to="/inicioSesion" color="#F5F5F5">Iniciar Sesión</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
