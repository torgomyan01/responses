import React from 'react';
import './navbar.css';
import Logo from '../../assets/images/logo-site.svg';
import rubleIcon from '../../assets/images/ruble-icon.svg';
import { Link } from 'react-router-dom';
import { Badge, Button, IconButton } from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import DropDownWb from '../../assets/images/DropDownWb.svg';
import { useSelector } from 'react-redux';
import { RandomKey } from '../../utils/helpers';
import { STORES_MARKETPLACE } from '../../utils/const';
import { SITE_URL } from '../../utils/const';

function Navbar() {
  const stores = useSelector((state: IUserInfo) => state.UserInfo.stores);

  function GetStoreImage(type: string) {
    const res = STORES_MARKETPLACE.find((_type) => _type.name === type);
    return res ? res.image : '';
  }

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
            <Dropdown.Toggle className="DropDownBtn" variant="success" id="dropdown-basic">
              <img src={DropDownWb} alt="img" />
              WB ИП ФИО...(№ 1111)
              <i className="fa-solid fa-caret-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="DropDownItem">
              {stores.map((store: IStores) => (
                <Dropdown.Item key={RandomKey()} className="DropDownItems">
                  <img src={GetStoreImage(store.storeType)} alt="img" />

                  {store.title}
                </Dropdown.Item>
              ))}

              <Link to="#" className="addShop">
                <div className="IconPlus">
                  <i className="fa-solid fa-plus" />
                </div>
                добавить МАГАЗИН
              </Link>
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
          <Link to={SITE_URL.CREATE_PROJECT} style={{ minWidth: 50, maxHeight: 50 }}>
            <IconButton
              aria-label="setting"
              className="nav-user ms-3"
              style={{ minWidth: 50, maxHeight: 50 }}>
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
