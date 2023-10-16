import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { GetStoreImage, RandomKey } from '../../../../utils/helpers';
import { CircularProgress, Tooltip } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { LocalStorageKeys, SITE_URL } from '../../../../utils/const';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStore } from '../../../../redux/user-info';

function DropdownNavbar() {
  const dispatch = useDispatch();
  const stores = useSelector((state: IUserInfo) => state.UserInfo.stores);
  const store = useSelector((state: IUserInfo) => state.UserInfo.activeStore);

  function changeSelect(store: IStores) {
    dispatch(setActiveStore(store));

    localStorage.setItem(LocalStorageKeys.activeStore, String(store.storeId));
  }

  return (
    <>
      {store && (
        <Dropdown className="DropDown">
          <Dropdown.Toggle className="DropDownBtn-nav" variant="success" id="dropdown-basic">
            {stores.length ? (
              <>
                <img src={GetStoreImage(store?.storeType)} alt="img" />
                {store?.title}
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
                  <Dropdown.Item
                    key={RandomKey()}
                    className="DropDownItems"
                    onClick={() => changeSelect(store)}>
                    <img src={GetStoreImage(store.storeType)} alt="img" />
                    {store.title}
                  </Dropdown.Item>
                ))}
                <div className="d-flex justify-content-between align-items-center me-4 mt-3">
                  <Tooltip title="Добавить магазин" placement="top">
                    <Link to={`../${SITE_URL.CREATE_MARKETPLACE}`} className="addShop">
                      <div className="IconPlus">
                        <i className="fa-solid fa-plus" />
                      </div>
                      добавить
                    </Link>
                  </Tooltip>
                  <Tooltip title="Смотреть все" placement="top">
                    <Link to={`../${SITE_URL.MY_STORES}`} className="addShop">
                      Все магазины
                    </Link>
                  </Tooltip>
                </div>
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
      )}
      {!store && (
        <NavLink to={`../${SITE_URL.CREATE_MARKETPLACE}`} className={'nav-item'}>
          Новый магазин
        </NavLink>
      )}
    </>
  );
}

export default DropdownNavbar;
