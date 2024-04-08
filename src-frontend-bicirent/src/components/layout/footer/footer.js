import React from 'react'

import './footer.css'
import NavLinkButton from '../../UI/Button/NavLinkButton/navLinkButton'
import facebookIcon from '../../../assets/images/icons/facebook.svg'
import twitterIcon from '../../../assets/images/icons/twitter.svg'
import instagramIcon from '../../../assets/images/icons/instagram.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-containerfooter">
        <div className="footer-containerfooter1">
          <div className="footer-containerfooternav">
            <div className="footer-containerfooternavsecction">
              <NavLinkButton to="/nosotros" >Sobre Nosotros</NavLinkButton>
            </div>
            <div className="footer-containerfooternavsecction1">
              <NavLinkButton to="/bicicletas" >Nuestras Bicicletas</NavLinkButton>
            </div>
            <div className="footer-containerfooternavsecction2">
              <NavLinkButton to="/contacto" >Contáctanos</NavLinkButton>
            </div>
            <div className="footer-containerfooternavsecction3">
              <NavLinkButton to="/terminos" >Términos y condiciones</NavLinkButton>
            </div>
            <div className="footer-containerfooternavsecction4">
              <NavLinkButton to="/privacidad" >Politicas de Privacidad</NavLinkButton>
            </div>
            <div className="footer-containerfooternavsecction5">
              <NavLinkButton to="/informacion" >Información de Copyright</NavLinkButton>
            </div>
            <div className="footer-containerfooternavsecction6">
              <NavLinkButton to="/preguntas">Preguntas Frecuentes</NavLinkButton>
            </div>
            <div className="footer-containerfooternavsecction7">
              <NavLinkButton to="/reseñas" >Reseñas de clientes</NavLinkButton>
            </div>
            <div className="footer-containerfooternavsecction8">
              <NavLinkButton to="/soporte" >Soporte</NavLinkButton>
            </div>
          </div>
          <div className="footer-containerfootericons">
            <Link to={""}> <img
              src={facebookIcon}
              alt="containerfootericon3613"
              className="footer-containerfootericon"
            /></Link>
            <Link to={""}>
              <img
                src={twitterIcon}
                alt="containerfootericon3613"
                className="footer-containerfootericon1"
              />
            </Link>
            <Link to={""}><img
              src={instagramIcon}
              alt="containerfootericon3613"
              className="footer-containerfootericon2"
            /></Link>

          </div>
          <div className="footer-containerfootercopy">
            <span className="footer-text18">
              <span>2024 BiciRent</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
