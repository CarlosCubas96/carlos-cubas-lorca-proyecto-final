import React from 'react'
import './main.css'
import Banner from '../../banner/banner'
import Feauture from '../../feature/feature'
import Category from '../../category/category'
import FeatureList from '../../feature-list/feature-list'

const Main = () => {
  return (
    <div className="main-container">
      <div className="main-containermain">
        <div className="main-containermainsecction">
          <Banner />
          <Feauture/>
          <Category/>
          <FeatureList/>
        </div>
      </div>
    </div>
  )
}

export default Main
