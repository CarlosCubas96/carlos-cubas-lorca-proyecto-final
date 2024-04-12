import React, { Component } from 'react';
import './headerAdmin.css';
import { Link } from 'react-router-dom';


import logoImg from '../../../assets/images/logos/logo.png';
import authService from '../../../services/auth/auth.service';
import EventBus from '../../../common/EventBus';
import Icon from '../../UI/icon/icon';

class HeaderAdmin extends Component {
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
          <div className="header-dash-board-containernavadminicons">
            <div className="header-dash-board-containernavicon">
              <Icon name="Bell" />
            </div>
            <div className="header-dash-board-containernavicon">
              <Icon name="Menu" />
            </div>
          </div>

          <div className="flex-shrink-0 dropdown">
            <Link to="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="36" height="36" className="rounded-circle" />
            </Link>
            <ul className="dropdown-menu text-small shadow">
              <li><Link to={"/admin"} className="dropdown-item">Panel de administrador</Link></li>
              <li><Link to={"/perfil"} className="dropdown-item">Perfil</Link></li>
              <li><Link to={"/ajustes"} className="dropdown-item">Ajustes</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link to={"/home"} onClick={this.logOut} className="dropdown-item">Cerrar sesión</Link></li>
            </ul>
          </div>

        </div>


      </div>

    );
  }
}

export default HeaderAdmin;
