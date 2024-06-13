import React from "react";
import './banner.css';
import SearchBoxButton from '../../Button/SearchBoxButton/searchBoxButton';

const Banner = () => {

  return (
    <div className="banner-containerbannermain">
      <div className="banner-containerbannerbackground">
        <div className="banner-containerbannertitle">
          <span className="banner-text">
            <span>Comparte tu bici y ayuda a cuidar el planeta</span>
          </span>
        </div>
        <div className="banner-containerbannersubtitle">
          <span className="banner-text2">
            <span>¡Alquila una bici cerca de ti o comparte la tuyo cuando no lo utilices!</span>
          </span>
        </div>
        <div className="banner-containerbannersearchbox">
          <form className="banner-containerbannersearchbox1">
            <div className="input-group">
              <input
                type="text"
                className="form-control banner-searchbox-placeholder"
                placeholder="¿Necesitas una bicicleta?"
              />
            </div>
            <SearchBoxButton to={`/publicaciones`}>Buscar</SearchBoxButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Banner;
