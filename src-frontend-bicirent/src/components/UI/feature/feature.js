import React from 'react'

import './feature.css'
import SearchBoxButton from '../Button/SearchBoxButton/searchBoxButton'

const Feauture = (props) => {
  return (
    <div className="feautre-container">
      <div className="feautre-containersectionfeaure">
        <div className="feautre-containerfeautreimg"></div>
        <div className="feautre-containerfeautreinfo">
          <div className="feautre-containerinfomain">
            <span className="feautre-text">
              <span>Creemos que una movilidad más eficiente es posible.</span>
            </span>
            <span className="feautre-text2">
              <span>
                Ofrecemos alquiler de bicicletas como una solución simple y
                eficaz para fomentar un estilo de vida activo y respetuoso con
                el medio ambiente. Cada pedalada es un paso hacia un futuro más
                verde. Únete a nosotros en nuestro viaje hacia una ciudad más
                limpia y saludable, donde la movilidad sostenible sea la norma.
                Juntos, podemos hacer una diferencia significativa.
              </span>
            </span>
            <SearchBoxButton to="/inicio">Buscar</SearchBoxButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feauture
