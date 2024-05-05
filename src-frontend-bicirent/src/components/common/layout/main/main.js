import React from 'react';
import './main.css';
import Banner from '../../../UI/Others/banner/banner';
import Feauture from '../../../UI/Others/feature/feature';
import Category from '../../../UI/Others/category/category';
import FeatureList from '../../../UI/Others/feature-list/feature-list';
import Post from '../../../UI/Others/post/post';
import Newsletter from '../../../UI/Others/newsletter/newsletter';

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
