import PropTypes from 'prop-types'

import './viewErrorUserAcessDenied.css'

import React, { useState, useEffect } from "react";

import manImg from "../../../assets/images/varias/hombre.png";
import bike from "../../../assets/images/varias/bicicleta.png";
import Header from '../../../components/common/layout/header/header';
import authService from '../../../services/auth/auth.service';
import { Link } from 'react-router-dom';

const ViewErrorUserAcessDenied = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="view-error-user-acess-denied-container">
      <div className="view-error-user-acess-denied-view-error-user-acess-denied">
        <Header currentUser={currentUser} />
        <div className="view-error-user-acess-denied-containerdashboardadmin">
          <div className="view-error-user-acess-denied-containeraccesssectionmain">
            <div className="view-error-user-acess-denied-containersectionaccesstitle">
              <div className="view-error-user-acess-denied-containeraccesstitle">
                <span className="view-error-user-acess-denied-text">
                  <span>Acceso denegado</span>
                </span>
              </div>
            </div>
            <div className="view-error-user-acess-denied-containersectionaccesssubtitle">
              <div className="view-error-user-acess-denied-containersectionsubtitle">
                <span className="view-error-user-acess-denied-text2">
                  <span>
                    Error 403. No tienes permiso para acceder a esta página
                  </span>
                </span>
              </div>
            </div>
            <Link to="/" className="view-error-user-acess-denied-containersectionaccessbuttom">
              <div className="view-error-user-acess-denied-containersectionbuttom">
                <div className="view-error-user-acess-denied-containersectionbuttomtext">
                  <span className="view-error-user-acess-denied-text4">
                    <span>Volver a la página de inicio</span>
                  </span>
                </div>
              </div>
            </Link>
            <div className="view-error-user-acess-denied-containersectionaccesssuport">
              <div className="view-error-user-acess-denied-containerbuttomtext">
                <span className="view-error-user-acess-denied-text6">
                  <span>�Necesitas ayuda? Contacta con soporte</span>
                </span>
              </div>
            </div>
            <img
              src={bike}
              alt="IMAGE5c62dd56cf304ddcb5f2d4e3a2c24a1ePhotoroom13661"
              className="view-error-user-acess-denied-image5c62dd56cf304ddcb5f2d4e3a2c24a1e-photoroom1"
            />
          </div>
          <img
            src={manImg}
            alt="IMAGE7935541removebgpreview13661"
            className="view-error-user-acess-denied-image7935541removebgpreview1"
          />
        </div>
      </div>
    </div>
  )
}

ViewErrorUserAcessDenied.defaultProps = {
  imageSrc: 'be6b45ab-816c-418b-9f1d-7d146b86705b',
  imageAlt: 'image',
  imageSrc1: 'd5933ce7-9027-4605-872b-933ad015514f',
  imageAlt1: 'image',
  imageSrc2: '3cf516b7-c8af-484c-bd97-f270f64d5ee0',
  imageAlt2: 'image',
}

ViewErrorUserAcessDenied.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  imageSrc1: PropTypes.string,
  imageAlt1: PropTypes.string,
  imageSrc2: PropTypes.string,
  imageAlt2: PropTypes.string,
}

export default ViewErrorUserAcessDenied
