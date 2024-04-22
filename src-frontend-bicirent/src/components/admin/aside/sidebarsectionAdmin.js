import React from 'react'

import './sidebarsectionAdmin.css'
import AsideButton from '../../UI/Button/AsideButton/asideButton'
import Icon from '../../UI/icon/icon'

const SidebarsectionAdmin = () => {
  return (
    <div className="containersidebarsection-containersidebarsection">
      <div className="containersidebarsection-containersidebarbr">
        <div className="containersidebarsection-containersidebarpanel">
          <div className="containersidebarsection-containersidebarpanelname">
            <span className="containersidebarsection-text">
              <h4>Admin</h4>
            </span>
          </div>
          <div className="containersidebarsection-containersidebarpanelmenu">
            <div className="containersidebarsection-containerpanelmenusection">

              <Icon name="Home" />

              <div className="containersidebarsection-containermenusectiontext">
                <AsideButton to="/admin" >Panel de administrador</AsideButton>
              </div>
            </div>
            <div className="containersidebarsection-containerpanelmenusection1">

              <Icon name="Users" />

              <div className="containersidebarsection-containermenusectiontext1">
                <AsideButton to="/panel">Usuarios</AsideButton>
              </div>
            </div>
            <div className="containersidebarsection-containerpanelmenusection2">

              <Icon name="Bici" />

              <div className="containersidebarsection-containermenusectiontext2">
                <AsideButton to="/panel">Bicicletas</AsideButton>
              </div>
            </div>
            <div className="containersidebarsection-containerpanelmenusection3">

              <Icon name="Bell" />

              <div className="containersidebarsection-containermenusectiontext3">
                <AsideButton to="/panel">Publicaciones</AsideButton>
              </div>
            </div>
            <div className="containersidebarsection-containerpanelmenusection4">
              <Icon name="Altavoz" />
              <div className="containersidebarsection-containermenusectiontext4">
                <AsideButton to="/panel">Alquileres</AsideButton>
              </div>
            </div>
          </div>
        </div>
        <div className="containersidebarsection-containersidebarpanel2">
          <div className="containersidebarsection-containersidebarpanel2menu">
            <div className="containersidebarsection-containerpanelmenusection5">

              <Icon name="Question" />

              <div className="containersidebarsection-containermenusectiontext5">
                <AsideButton to="/panel">Soporte</AsideButton>
              </div>
            </div>
            <div className="containersidebarsection-containerpanelmenusection6">

              <Icon name="Logout" />

              <div className="containersidebarsection-containermenusectiontext6">
                <AsideButton to="/panel">Cerrar Sesión</AsideButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarsectionAdmin
