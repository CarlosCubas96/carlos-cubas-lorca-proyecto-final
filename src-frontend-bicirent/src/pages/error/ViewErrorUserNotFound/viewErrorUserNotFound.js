import React from 'react'

import './viewErrorUserNotFound.css'
import { Link } from 'react-router-dom'

const ViewErrorUserNotFound = (props) => {
  return (
    <div className="view-error-user-not-found-container">
      <div className="view-error-user-not-found-view-error-user-not-found">
        <div className="view-error-user-not-found-containerheader"></div>
        <div className="view-error-user-not-found-containerdashboardadmin">
          <div className="view-error-user-not-found-containeraccesssectionmain">
            <div className="view-error-user-not-found-containersectionaccesstitle">
              <div className="view-error-user-not-found-containeraccesstitle">
                <span className="view-error-user-not-found-text">
                  <span>No se encuentra la página</span>
                </span>
              </div>
            </div>
            <div className="view-error-user-not-found-containersectionaccesssubtitle">
              <div className="view-error-user-not-found-containersectionsubtitle">
                <span className="view-error-user-not-found-text2">
                  <span>
                    Mientras los arreglamos, escríbenos a ayuda@bicirent.com
                  </span>
                </span>
              </div>
            </div>
            <Link to="/" className="view-error-user-not-found-containersectionaccessbuttom">
              <div className="view-error-user-not-found-containersectionbuttom">
                <div className="view-error-user-not-found-containersectionbuttomtext">
                  <span className="view-error-user-not-found-text4">
                    <span>Volver a la página de inicio</span>
                  </span>
                </div>
              </div>
            </Link>
            <div className="view-error-user-not-found-containersectionaccesssuport">
              <div className="view-error-user-not-found-containerbuttomtext">
                <span className="view-error-user-not-found-text6">
                  <span>�Necesitas ayuda? Contacta con soporte</span>
                </span>
              </div>
            </div>
            <img
              src="/external/image5c62dd56cf304ddcb5f2d4e3a2c24a1ephotoroom13661-qg3-300h.png"
              alt="IMAGE5c62dd56cf304ddcb5f2d4e3a2c24a1ePhotoroom13661"
              className="view-error-user-not-found-image5c62dd56cf304ddcb5f2d4e3a2c24a1e-photoroom1"
            />
          </div>
          <img
            src="/external/image7922867removebgpreviewremovebgpreview13651-n9z-700h.png"
            alt="IMAGE7922867removebgpreviewremovebgpreview13651"
            className="view-error-user-not-found-image7922867removebgpreviewremovebgpreview1"
          />
        </div>
      </div>
    </div>
  )
}

export default ViewErrorUserNotFound
