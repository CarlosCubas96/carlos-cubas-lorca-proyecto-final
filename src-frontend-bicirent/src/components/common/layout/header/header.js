import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logoImg from "../../../../assets/images/logos/logo.png";
import NavButton from "../../../../components/UI/Button/NavButton/navButton";
import PrimaryButton from "../../../../components/UI/Button/PrimaryButton/primaryButton";
import Icon from "../../../../components/UI/icon/icon";
import authService from "../../../../services/auth/auth.service";
import EventBus from "../../../../common/EventBus";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    EventBus.on("logout", () => {
      this.logOut();
    });

    const { currentUser } = this.props;
    if (currentUser) {
      this.setState({
        currentUser: currentUser,
      });
    }
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    authService.logout();
    this.setState({
      currentUser: undefined,
    });
    window.location.reload();
  }

  render() {
    const { currentUser } = this.state;

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
            <NavButton to="/">Servicios</NavButton>
            <NavButton to="/">Contáctanos</NavButton>
            <NavButton to="/">Sobre Nosotros</NavButton>
          </div>

          {currentUser && currentUser.roles && currentUser.roles.includes("ROLE_ADMIN") ? (
            <div className="header-dash-board-containernavadminicons">
              <Link className="header-dash-board-containernavicon" to={"/admin/perfil"}>
                <Icon name="Settings" />
              </Link>

              <button className="header-dash-board-containernavicon" onClick={this.logOut}>
                <Icon name="User" />
              </button>

              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                </a>
                <ul className="dropdown-menu text-small">
                  <li>
                    <Link className="dropdown-item" to="#">
                      New project...
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={this.logOut}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : currentUser && currentUser.roles && currentUser.roles.includes("ROLE_USER") ? (
            <div className="header-dash-board-containernavadminicons">
              <div className="header-dash-board-containernavicon">
                <Icon name="Bell" />
              </div>
              <div className="header-dash-board-containernavicon" >
                <Icon name="User" />
              </div>

              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                </a>
                <ul className="dropdown-menu text-small">
                  <li>
                    <Link className="dropdown-item" to="#">
                      New project...
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={this.logOut}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>

            </div>
          ) : (
            <div className="header-container__nav-buttons">
              {/* Si el usuario no está autenticado, mostramos botones para iniciar sesión y registrarse */}
              <>
                <PrimaryButton to="/registro">Registrarse</PrimaryButton>
                <PrimaryButton to="/login" color="#F5F5F5">
                  Iniciar Sesión
                </PrimaryButton>
              </>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
