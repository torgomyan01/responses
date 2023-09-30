import React from 'react';
import Navbar from '../navbar/navbar';

function MainTemplate({ children, className = '' }: MainTemplate) {
  return (
    <>
      <div className={`container MainTemplate ${className}`}>{children}</div>
    </>
  );
}

export default MainTemplate;
