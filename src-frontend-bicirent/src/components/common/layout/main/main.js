import React from 'react';
import './main.css';
import Banner from '../../../UI/banner/banner';
import Feauture from '../../../UI/feature/feature';
import Category from '../../../UI/category/category';
import FeatureList from '../../../UI/feature-list/feature-list';
import Post from '../../../UI/post/post';
import Newsletter from '../../../UI/newsletter/newsletter';
import AdminMainContent from '../../../admin/main/adminMainContent/adminMainContent'; // Importa el componente AdminMainContent si es necesario

const Main = ({ currentUser }) => {
  return (
    <div>
      {currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN') ? (
        <AdminMainContent /> 
      ) : (
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
      )}
    </div>
  );
};

export default Main;
