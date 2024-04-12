import React from 'react'

import './post.css'

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
            <div className="publicaciones-containercategorieimg">
              <div className="publicaciones-categorieimg3"></div>
            </div>
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
            <div className="publicaciones-containercategorieimg1">
              <div className="publicaciones-categorieimg2"></div>
            </div>
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
            <div className="publicaciones-containercategorieimg2">
              <div className="publicaciones-categorieimg1"></div>
            </div>
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
