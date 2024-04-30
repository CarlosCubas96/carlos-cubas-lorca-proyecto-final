import React from 'react';
import './main.css';
import Banner from '../../../UI/banner/banner';
import Feauture from '../../../UI/feature/feature';
import Category from '../../../UI/category/category';
import FeatureList from '../../../UI/feature-list/feature-list';
import Post from '../../../UI/post/post';
import Newsletter from '../../../UI/newsletter/newsletter';

const Main = () => {
  return (
    <div className="main-container">
      <div className="main-containermain">
        <div className="main-containermainsecction">
          <Banner />
          <Feauture />
          <Category />
          <FeatureList />
          <Post />
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Main;
