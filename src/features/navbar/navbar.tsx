import React, { useState } from 'react';
import './navbar.css';
import Logo from '../../assets/images/logo-site.svg';
import rubleIcon from '../../assets/images/ruble-icon.svg';
import { Link } from 'react-router-dom';
import { Badge, Button, IconButton } from '@mui/material';
import { SITE_URL } from '../../utils/const';
import DropdownNavbar from './components/dropdown/dropdown';

function Navbar() {
  const pathName = window.location.pathname;
  return (
    <div className="nav">
      <div className="container h-100 d-flex justify-content-between align-items-center">
        <Link to="/" className="nav-logo">
          <img src={Logo} alt="Logo SIte" className="logo-site" />
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <Link
            to={SITE_URL.SETTINGS_REVIEWS}
            className={`nav-item ${pathName === SITE_URL.SETTINGS_REVIEWS ? 'active' : ''}`}>
            Настройка отзывов
          </Link>
          {/*<Link to="#" className="nav-item">*/}
          {/*  Настройка отзывов*/}
          {/*  <i className="fa-regular fa-chevron-down ms-2" />*/}
          {/*</Link>*/}
          <DropdownNavbar />
          <Link to="#" className="nav-item">
            Статистика
          </Link>
          <Link to="#" className="nav-item">
            Анализ
          </Link>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="nav-price">
            0,00
            <img src={rubleIcon} alt="rubleIcon" className="ms-2" />
          </div>
          <Button variant="contained" className="purple-button ms-3">
            Пополнить
          </Button>
          <IconButton aria-label="setting" className="ms-3 c-white">
            <i className="fa-regular fa-gear" />
          </IconButton>
          <Badge
            badgeContent={9}
            color="primary"
            overlap="circular"
            className="ms-3 nav-debug"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}>
            <IconButton aria-label="setting" className="c-white">
              <i className="fa-sharp fa-solid fa-bell" />
            </IconButton>
          </Badge>
          <Link to={SITE_URL.PROFILE_SETTINGS} style={{ minWidth: 40, maxHeight: 40 }}>
            <IconButton
              aria-label="setting"
              className="nav-user ms-3"
              style={{ minWidth: 40, maxHeight: 40 }}>
              <i className="fa-regular fa-user" />
            </IconButton>
          </Link>
          <IconButton aria-label="setting" className="c-white ms-3">
            <i className="fa-regular fa-right-to-bracket" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
