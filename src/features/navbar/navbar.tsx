import React from 'react';
import './navbar.css';
import Logo from '../../assets/images/logo-site.svg';
import rubleIcon from '../../assets/images/ruble-icon.svg';
import { Link } from 'react-router-dom';
import { Badge, Button, CircularProgress, IconButton } from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import { GetStoreImage, RandomKey } from '../../utils/helpers';
import { SITE_URL } from '../../utils/const';

function Navbar() {
  const stores = useSelector((state: IUserInfo) => state.UserInfo.stores);

  return (
    <div className="nav">
      <div className="container h-100 d-flex justify-content-between align-items-center">
        <Link to="/" className="nav-logo">
          <img src={Logo} alt="Logo SIte" className="logo-site" />
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="#" className="nav-item">
            Настройка отзывов
          </Link>
          {/*<Link to="#" className="nav-item">*/}
          {/*  Настройка отзывов*/}
          {/*  <i className="fa-regular fa-chevron-down ms-2" />*/}
          {/*</Link>*/}
          <Dropdown className="DropDown">
            <Dropdown.Toggle className="DropDownBtn-nav" variant="success" id="dropdown-basic">
              {stores.length ? (
                <>
                  <img src={GetStoreImage(stores[0]?.storeType)} alt="img" />
                  {stores[0]?.title}
                </>
              ) : (
                <CircularProgress
                  size={15}
                  sx={{
                    color: '#fff'
                  }}
                  className="mt-1"
                />
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu className="DropDownItem-nav">
              {stores.length ? (
                <>
                  {stores.map((store: IStores) => (
                    <Dropdown.Item key={RandomKey()} className="DropDownItems">
                      <img src={GetStoreImage(store.storeType)} alt="img" />

                      {store.title}
                    </Dropdown.Item>
                  ))}
                  <Link to={SITE_URL.CREATE_MARKETPLACE} className="addShop">
                    <div className="IconPlus">
                      <i className="fa-solid fa-plus" />
                    </div>
                    добавить МАГАЗИН
                  </Link>
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <CircularProgress
                    size={30}
                    sx={{
                      color: '#4B4AEF'
                    }}
                    className="mt-1"
                  />
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>
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
