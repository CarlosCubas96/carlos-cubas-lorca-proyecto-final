import React, { Component } from 'react';
import './headerUser.css';
import { Link } from 'react-router-dom';

import PrimaryButton from '../../../UI/Button/PrimaryButton/primaryButton';
import logoImg from '../../../../assets/images/logos/logo.png'
import authService from '../../../../services/auth/auth.service';

import EventBus from "../../../../common/EventBus";
import NavButton from '../../../UI/Button/NavButton/navButton';

class HeaderUser extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = authService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    authService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

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
            {/* Opciones de navegación comunes para todos los usuarios */}
            <NavButton to="/inicio">Inicio</NavButton>
            <NavButton to="/inicio">Alquila tu bici</NavButton>
            <NavButton to="/inicio">Servicios</NavButton>
            <NavButton to="/inicio">Contáctanos</NavButton>
            <NavButton to="/inicio">Sobre Nosotros</NavButton>
          </div>
          <div className="header-container__nav-buttons">
            {/* Mostramos diferentes botones según si el usuario está autenticado o no */}
            {currentUser ? (
              // Si el usuario está autenticado, mostramos un botón para cerrar sesión
              <PrimaryButton onClick={this.logOut}>Cerrar Sesión</PrimaryButton>
            ) : (
              // Si el usuario no está autenticado, mostramos botones para iniciar sesión y registrarse
              <>
                <PrimaryButton to="/register">Registrarse</PrimaryButton>
                <PrimaryButton to="/login" color="#F5F5F5">Iniciar Sesión</PrimaryButton>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderUser;