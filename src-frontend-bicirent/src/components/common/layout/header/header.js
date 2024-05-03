import React, { Component } from "react";
import { Link } from "react-router-dom";

import './header.css'
import logoImg from '../../../../assets/images/logos/logo.png'

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
    }

    render() {
        const { currentUser } = this.props;

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
                        <NavButton to="/">Inicio</NavButton>
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
                            
                            <img src="https://github.com/mdo.png" alt="mdo" width="36" height="36" className="rounded-circle" />

                        </div>
                    ) : currentUser && currentUser.roles && currentUser.roles.includes('ROLE_USER') ? (
                        <div className="header-dash-board-containernavadminicons">
                            <div className="header-dash-board-containernavicon">
                                <Icon name="Bell" />
                            </div>
                            <div className="header-dash-board-containernavicon">
                                <Icon name="Menu" />
                            </div>

                            <img src="https://github.com/mdo.png" alt="mdo" width="36" height="36" className="rounded-circle" />


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
        );
    }
}

export default Header;
