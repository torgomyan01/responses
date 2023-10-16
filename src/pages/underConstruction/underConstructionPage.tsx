import React from 'react';
import MainTemplate from '../../features/main-template/main-template';
// import constructionImage from './construction.gif';
import './underConstructionPage.scss';

const UnderConstructionPage: React.FC = () => {
  return (
    <MainTemplate className="">
      <>
        <div className="under-construction">
          {/* <img src={constructionImage} alt="Under Construction" /> */}
          <h1>Мы в работе!</h1>
          <p>Эта страница пока в работе, но мы уже видим свет в конце тоннеля!</p>
          <p>Пожалуйста, оставайтесь с нами и ждите с нетерпением!</p>
        </div>
      </>
    </MainTemplate>
  );
};

export default UnderConstructionPage;
