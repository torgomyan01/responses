import React, { useEffect } from 'react';
import './shape.scss';
import updateButton from '../../assets/images/update-button.svg';
import { Link, useLocation } from 'react-router-dom';
import { SITE_URL } from '../../utils/const';

interface ShapeProps {
  onRerfreshClick?: () => void;
}

const Shape: React.FC<ShapeProps> = ({ onRerfreshClick }) => {
  const location = useLocation();

  const handleRefreshClick = () => {
    if (onRerfreshClick) {
      onRerfreshClick();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="shape">
      <div>
        <Link
          className={`shape-item ${location.pathname.includes(SITE_URL.PRODUCTS) ? 'green' : ''}`}
          to={`../${SITE_URL.PRODUCTS}`}>
          <i className="fa-regular fa-gift me-2" />
          Список товаров
        </Link>
      </div>
      <div>
        <Link
          className={`shape-item ${location.pathname.includes(SITE_URL.FEEDBACKS) ? 'green' : ''}`}
          to={`../${SITE_URL.FEEDBACKS}`}>
          <i className="fa-regular fa-message-lines fa-flip-horizontal me-2" />
          Отзывы
        </Link>
      </div>
      <img
        src={updateButton}
        alt="updateButton"
        onClick={handleRefreshClick}
        className="cursor-pointer"
      />
    </div>
  );
};

export default Shape;
