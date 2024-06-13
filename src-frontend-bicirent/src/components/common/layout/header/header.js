import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import "./header.css";
import logoImg from "../../../../assets/images/logos/logo.png";


import logoUser from "../../../../assets/images/icons/user.png";
import logoAdmin from "../../../../assets/images/icons/admin.png";

import NavButton from "../../../../components/UI/Button/NavButton/navButton";
import PrimaryButton from "../../../../components/UI/Button/PrimaryButton/primaryButton";
import Icon from "../../../../components/UI/icon/icon";
import authService from "../../../../services/auth/auth.service";
import EventBus from "../../../../common/EventBus";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    authService.logout();
    window.location.reload();
    <Navigate to="/" />
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="header-container">
        <div className="header-container__logo">
          <Link to="/" className="header-container__logo">
            <img src={logoImg} alt="header logo" className="header-logo" />
          </Link>
        </div>
        <div className="header-container__nav">
          <div className="header-container__nav-items">
            <NavButton to="/">Inicio</NavButton>
            <NavButton color={"#38E078"} to="/user/publicaciones/add/post">
              Alquila tu bici
            </NavButton>
            <NavButton to="/publicaciones">Catálogo</NavButton>
            <NavButton to="/">Contáctanos</NavButton>
            <NavButton to="/">Sobre Nosotros</NavButton>
          </div>

          {currentUser && currentUser.roles && currentUser.roles.includes("ROLE_ADMIN") ? (
            <div className="header-dash-board-containernavadminicons">
              <Link className="header-dash-board-containernavicon">
                <Icon name="Bell" />
              </Link>
              <Link to={"/user"} className="header-dash-board-containernavicon">
                <Icon name="Settings" />
              </Link>

              <div className="dropdown text-end">
                <Link className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={logoAdmin} alt="mdo" width="32" height="32" className="rounded-circle" />
                </Link>

                <ul className="dropdown-menu text-small">
                  <li>
                    <Link to={"/admin"} className="dropdown-item" >
                      Panel de Administrador
                    </Link>
                  </li>
                  <li>
                    <Link to={"/user"} className="dropdown-item" >
                      Mis Alquileres
                    </Link>
                  </li>
                  <li>
                    <Link to={"/user/publicaciones"} className="dropdown-item">
                      Mis Publicaciones
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={this.logOut}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : currentUser && currentUser.roles && currentUser.roles.includes("ROLE_USER") ? (
            <div className="header-dash-board-containernavadminicons">
              <Link className="header-dash-board-containernavicon">
                <Icon name="Bell" />
              </Link>
              <Link to={"/user/perfil"} className="header-dash-board-containernavicon">
                <Icon name="Settings" />
              </Link>

              <div className="dropdown text-end">
                <Link className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={logoUser} alt="mdo" width="32" height="32" className="rounded-circle" />
                </Link>

                <ul className="dropdown-menu text-small">
                  <li>
                    <Link to={"/user"} className="dropdown-item" >
                      Panel de Usuario
                    </Link>
                  </li>
                  <li>
                    <Link to={"/user"} className="dropdown-item" >
                      Mis Alquileres
                    </Link>
                  </li>
                  <li>
                    <Link to={"/user/publicaciones"} className="dropdown-item">
                      Mis Publicaciones
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={this.logOut}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="header-container__nav-buttons">
              <PrimaryButton to="/registro">Registrarse</PrimaryButton>
              <PrimaryButton to="/login" color="#F5F5F5">
                Iniciar Sesión
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
