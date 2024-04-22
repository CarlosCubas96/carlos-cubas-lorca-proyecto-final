import React, { Component } from "react";
import { Link } from "react-router-dom";

import './home.css'
import logoImg from '../../assets/images/logos/logo.png'

import NavButton from "../../components/UI/Button/NavButton/navButton";
import PrimaryButton from "../../components/UI/Button/PrimaryButton/primaryButton";

import authService from "../../services/auth/auth.service";
import EventBus from "../../common/EventBus";
import Icon from "../../components/UI/icon/icon";
import Main from "../../components/common/layout/main/main";
import Footer from "../../components/common/layout/footer/footer";



export default class Home extends Component {
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
            <div>
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
                            <NavButton to="/inicio">Inicio</NavButton>
                            <NavButton to="/alquiler">Alquila tu bici</NavButton>
                            <NavButton to="/servicios">Servicios</NavButton>
                            <NavButton to="/contacto">Contáctanos</NavButton>
                            <NavButton to="/nosotros">Sobre Nosotros</NavButton>
                        </div>

                        {/* Mostramos diferentes botones según si el usuario está autenticado y su rol */}
                        {currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN') ? (
                            <div className="header-dash-board-containernavadminicons">
                                <div className="header-dash-board-containernavicon">
                                    <Icon name="Bell" />
                                </div>
                                <div className="header-dash-board-containernavicon">
                                    <Icon name="Menu" />
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
                                        <li><Link to={"/login"} onClick={this.logOut} className="dropdown-item">Cerrar sesión</Link></li>
                                    </ul>
                                </div>
                            </div>
                        ) : currentUser && currentUser.roles && currentUser.roles.includes('ROLE_USER') ? (
                            <div className="header-dash-board-containernavadminicons">

                                <div className="header-dash-board-containernavicon">
                                    <Icon name="Bell" />
                                </div>
                                <div className="header-dash-board-containernavicon">
                                    <Icon name="Menu" />
                                </div>
                                <div className="flex-shrink-0 dropdown">
                                    <Link to="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://github.com/mdo.png" alt="mdo" width="36" height="36" className="rounded-circle" />
                                    </Link>
                                    <ul className="dropdown-menu text-small shadow">
                                        <li><Link to={"/admin"} className="dropdown-item">Panel de administrador</Link></li>
                                        <li><Link to={"/lista"} className="dropdown-item">Perfil</Link></li>
                                        <li><Link to={"/ajustes"} className="dropdown-item">Ajustes</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link to={"/login"} onClick={this.logOut} className="dropdown-item">Cerrar sesión</Link></li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="header-container__nav-buttons">
                                {/* Si el usuario no está autenticado, mostramos botones para iniciar sesión y registrarse */}
                                <>
                                    <PrimaryButton to="/registro">Registrarse</PrimaryButton>
                                    <PrimaryButton to="/login" color="#F5F5F5">Iniciar Sesión</PrimaryButton>
                                </>
                            </div>
                        )}
                    </div>
                </div>



                {!currentUser && ( // Usuario no logueado
                    <>
                        <Main />
                        <Footer />
                    </>
                )}

                {currentUser && currentUser.roles && currentUser.roles.includes('ROLE_USER') && ( // Usuario logueado como usuario

                    <>
                        <p>Bienvenido, Usuario.</p>
                        <Main />
                        <Footer />
                    </>
                )}

                {currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN') && ( // Usuario logueado como administrador
                    <>
                        <p>Bienvenido, Administrador.</p>
                        <Main />
                        <Footer />
                    </>
                )}

            </div>
        );
    }
}
