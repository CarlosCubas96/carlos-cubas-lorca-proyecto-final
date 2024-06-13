import React from 'react'

import './post.css'

import montaña from '../../../../assets/images/varias/montaña.png'
import carretera from '../../../../assets/images/varias/carretera.png'
import paseo from '../../../../assets/images/varias/paseo.png'

import { Link } from 'react-router-dom'

const Post = () => {
  return (
    <div className="publicaciones-container">
      <div className="publicaciones-containersectioncategories">
        <div className="publicaciones-containercategoriestitle">
          <div className="publicaciones-containercategoriestitleh1">
            <span className="publicaciones-text">
              <span>Nuestras Categorias</span>
            </span>
          </div>
          <div className="publicaciones-containercategoriessubtitle">
            <span className="publicaciones-text02">
              <span>Descubre las ventajas de nuestra plataforma</span>
            </span>
          </div>
        </div>
        <div className="publicaciones-containercategorieslist">
          <div className="publicaciones-containercardcategorie">
            <Link to={"/publicaciones"} className="publicaciones-containercategorieimg">
              <img alt='' src={montaña} className="publicaciones-categorieimg3"></img>
            </Link>
            <div className="publicaciones-containercategorietext">
              <div className="publicaciones-containercategorietexttitle">
                <span className="publicaciones-text04">
                  <span>Bicicletas de Montaña</span>
                </span>
              </div>
              <div className="publicaciones-containercategorietextsubtitle">
                <span className="publicaciones-text06">
                  <span>Explora senderos y la ciudad en bicicleta</span>
                </span>
              </div>
            </div>
          </div>
          <div className="publicaciones-containercardcategorie1">
            <Link to={"/publicaciones"} className="publicaciones-containercategorieimg1">
              <img alt='' src={paseo} className="publicaciones-categorieimg2"></img>
            </Link>
            <div className="publicaciones-containercategorietext1">
              <div className="publicaciones-containercategorietexttitle1">
                <span className="publicaciones-text08">
                  <span>Bicicletas de Paseo</span>
                </span>
              </div>
              <div className="publicaciones-containercategorietextsubtitle1">
                <span className="publicaciones-text10">
                  <span>Recorre largas distancias con comodidad</span>
                  <br></br>
                  <span></span>
                </span>
              </div>
            </div>
          </div>
          <div className="publicaciones-containercardcategorie2">
            <Link to={"/publicaciones"} className="publicaciones-containercategorieimg2">
              <img alt='' src={carretera} className="publicaciones-categorieimg1"></img>
            </Link>
            <div className="publicaciones-containercategorietext2">
              <div className="publicaciones-containercategorietexttitle2">
                <span className="publicaciones-text14">
                  <span>Bicicletas de Carretera</span>
                </span>
              </div>
              <div className="publicaciones-containercategorietextsubtitle2">
                <span className="publicaciones-text16">
                  <span>Bicicletas rápidas y livianas para la carretera</span>
                  <br></br>
                  <span></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
