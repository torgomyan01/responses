import React, { useState } from 'react';
import './navbar.scss';
import Logo from '../../assets/images/logo-site.svg';
import rubleIcon from '../../assets/images/ruble-icon.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Badge, Button, CircularProgress, IconButton } from '@mui/material';
import { SITE_URL } from '../../utils/const';
import DropdownNavbar from './components/dropdown/dropdown';
import { UserLogout } from '../../utils/api';

function Navbar() {
  const navigate = useNavigate();
  const [loadingLogout, setLoadingLogout] = useState<boolean>(false);
  const pathName = window.location.pathname;

  function LogoutUser() {
    setLoadingLogout(true);
    UserLogout().then(({ data }) => {
      setLoadingLogout(false);
      // dispatch(setUserAuth(false));
      // changeUserAuth('0');
      navigate(SITE_URL.LOGIN);
    });
  }

  return (
    <div className="nav">
      <div className="container h-100 d-flex justify-content-between align-items-center">
        <Link to="/" className="nav-logo">
          <img src={Logo} alt="Logo SIte" className="logo-site" />
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <NavLink to={`../${SITE_URL.STORE_SETTINGS}`} className="nav-item">
            Настройка отзывов
          </NavLink>
          {/*<Link to="#" className="nav-item">*/}
          {/*  Настройка отзывов*/}
          {/*  <i className="fa-regular fa-chevron-down ms-2" />*/}
          {/*</Link>*/}
          <DropdownNavbar />
          <NavLink to={`../${SITE_URL.STATISTICS}`} className="nav-item">
            Статистика
          </NavLink>
          <NavLink to={`../${SITE_URL.ANALYSYS}`} className="nav-item">
            Анализ
          </NavLink>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="nav-price">
            0,00
            <img src={rubleIcon} alt="rubleIcon" className="ms-2" />
          </div>
          <Link to={`../${SITE_URL.TOPUP}`}>
            <Button variant="contained" className="purple-button ms-3">
              Пополнить
            </Button>
          </Link>
          <Link to={`../${SITE_URL.SETTINGS}`}>
            <IconButton aria-label="setting" className="ms-3 c-white">
              <i className="fa-regular fa-gear" />
            </IconButton>
          </Link>
          <Link to={`../${SITE_URL.NOTIFICATIONS}`}>
            <Badge
              badgeContent={1}
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
          </Link>
          <Link to={`../${SITE_URL.PROFILE_SETTINGS}`} style={{ minWidth: 40, maxHeight: 40 }}>
            <IconButton
              aria-label="setting"
              className="nav-user ms-3"
              style={{ minWidth: 40, maxHeight: 40 }}>
              <i className="fa-regular fa-user" />
            </IconButton>
          </Link>
          <IconButton aria-label="setting" className="c-white ms-3" onClick={LogoutUser}>
            {loadingLogout ? (
              <CircularProgress
                size={25}
                sx={{
                  color: '#FFF'
                }}
                className="ms-2"
              />
            ) : (
              <i className="fa-regular fa-right-to-bracket" />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
