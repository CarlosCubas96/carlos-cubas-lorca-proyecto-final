import React from "react";

import "./feature-list.css";
import Icon from "../../icon/icon";

const FeatureList = (props) => {
  return (
    <div className="feature-list-container">
      <div className="feature-list-containersectionfeaurelist">
        <div className="feature-list-containerfeaturelist">
          <div className="feature-list-containerfeaturelisticons">
            <Icon name="Bici"></Icon>
          </div>
          <div className="feature-list-containerfeaturelisttexts">
            <div className="feature-list-containerfeaturelisttitle">
              <span className="feature-list-text">
                <span>Sostenibilidad</span>
              </span>
            </div>
            <div className="feature-list-containerfeaturelistsubtitle">
              <span className="feature-list-text02">
                <span>
                  Facilitamos el intercambio de bicicletas entre usuarios,
                  promoviendo la sostenibilidad y la accesibilidad al transporte
                  ecológico
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="feature-list-containerfeaturelist1">
          <div className="feature-list-containerfeaturelisticons1">
            <Icon name="Billete"></Icon>
          </div>
          <div className="feature-list-containerfeaturelisttexts1">
            <div className="feature-list-containerfeaturelisttitle1">
              <span className="feature-list-text04">
                <span>Tarifas</span>
              </span>
            </div>
            <div className="feature-list-containerfeaturelistsubtitle1">
              <span className="feature-list-text06">
                <span>
                  Ofrecemos tarifas económicas y transparentes: alquila con
                  confianza, sin cargos ocultos, solo pagas por el tiempo que
                  necesitas.
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="feature-list-containerfeaturelist2">
          <div className="feature-list-containerfeaturelisticons2">
            <Icon name="Reloj"></Icon>
          </div>
          <div className="feature-list-containerfeaturelisttext">
            <div className="feature-list-containerfeaturelisttitle2">
              <span className="feature-list-text08">
                <span>Flexibilidad</span>
              </span>
            </div>
            <div className="feature-list-containerfeaturelistsubitutle">
              <span className="feature-list-text10">
                <span>
                  Registra tus ofertas en nuestra plataforma en minutos y
                  comienza a disfrutar rápidamente de los beneficios del
                  intercambio.
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureList;
