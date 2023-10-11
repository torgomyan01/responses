import React, { useEffect, useState } from 'react';
import MainTemplate from '../../features/main-template/main-template';
import { ChangeDefInputValue, RandomKey } from '../../utils/helpers';
import { Backdrop, Button, Checkbox, CircularProgress } from '@mui/material';
import Interrogative from '../../features/Interrogative/Interrogative';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import { useDispatch, useSelector } from 'react-redux';
import InfoOzon from '../profile-settings/components/info-ozon/info-ozon';
import InfoWaldberis from '../profile-settings/components/info-waldberis/info-waldberis';
import { DEF_INPUT, STORES_MARKETPLACE } from '../../utils/const';
import { useNavigate } from 'react-router-dom';
import { ChangeStore, GetUserStore } from '../../utils/api';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { AlertSiteTypes } from '../../enums/enums';
import { changeStores, setActiveStore } from '../../redux/user-info';

const label = {
  inputProps: { 'aria-label': 'Checkbox demo', name: 'marketplace' },
  sx: {
    '& .MuiSvgIcon-root': {
      color: '#61CDA6',
      fontSize: 28,
      position: 'relative',
      top: -1
    }
  }
};

const arrSelectMarketplace = [
  {
    name: 'Ozon',
    tooltipTitle: 'Ozon',
    inShort: '',
    tooltipText:
      'Ozon lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt oris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum '
  },
  {
    name: 'Яндекс.Маркет',
    tooltipTitle: 'Яндекс.Марке',
    inShort: '',
    tooltipText:
      'Ozon lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt oris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum '
  },
  {
    name: 'Wildberries',
    tooltipTitle: 'Wildberries',
    inShort: '',
    tooltipText:
      'Ozon lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt oris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum '
  }
];

STORES_MARKETPLACE.forEach((item, index) => {
  arrSelectMarketplace[index].inShort = item.name;
});

function ChangeMarketplace() {
  const dispatch = useDispatch();
  const activeStore = useSelector((state: IUserInfo) => state.UserInfo.activeStore);

  const [checkboxActive, setCheckboxActive] = useState<number>(0);
  const infoMarketplace = [<InfoOzon key={RandomKey()} />, '', <InfoWaldberis key={RandomKey()} />];
  const [name, setName] = useState<IDefInputs>(DEF_INPUT);
  const [key, setKey] = useState<IDefInputs>(DEF_INPUT);
  const [loading, setLoading] = useState<boolean>(false);
  const [store, setStore] = useState<IStores | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setName({
      error: false,
      value: store?.title || ''
    });
    setKey({
      error: false,
      value: store?.apiToken || ''
    });

    arrSelectMarketplace.forEach((item, index) => {
      if (item.inShort === store?.storeType) {
        setCheckboxActive(index);
      }
    });
  }, [store]);

  useEffect(() => {
    if (activeStore && activeStore.storeId) {
      GetUserStore(activeStore.storeId)
        .then(({ data }) => {
          setStore(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [activeStore]);

  function saveChanges() {
    if (activeStore?.storeId) {
      if (!name.value) {
        setName(ChangeDefInputValue(name.value, true));
        return;
      }
      if (!key.value) {
        setKey(ChangeDefInputValue(key.value, true));
        return;
      }
      setLoading(true);
      ChangeStore(
        {
          storeId: activeStore?.storeId,
          storeType: arrSelectMarketplace[checkboxActive].inShort,
          title: name.value,
          apiToken: key.value
        },
        activeStore?.storeId
      )
        .then((res) => {
          setLoading(false);
          dispatch(changeStores(res.data));
          dispatch(
            setActiveStore({
              isAuthorized: true,
              storeId: res.data.storeId,
              storeType: arrSelectMarketplace[checkboxActive].inShort,
              title: name.value,
              apiToken: key.value
            })
          );
          dispatch(
            openAlert({
              status: AlertSiteTypes.success,
              go: true
            })
          );
          dispatch(setMessageAlert('Изменено успешно сохранено'));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }

  return (
    <MainTemplate className="reviewModeration">
      <h2 className="def-section-title mb-4">выберите маркетплейс</h2>
      <div className="row">
        <div className="col-7">
          <div className="select-marketplace">
            {arrSelectMarketplace.map((item, index) => (
              <div key={RandomKey()} className="select-marketplace-item">
                <label className="d-flex justify-content-start align-items-center me-2">
                  <Checkbox
                    {...label}
                    checked={checkboxActive === index}
                    onChange={() => setCheckboxActive(index)}
                  />
                  {item.name}
                </label>
                <Interrogative title={item.tooltipTitle} text={item.tooltipText} />
              </div>
            ))}
          </div>
          <h2 className="def-section-title mb-4 mt-5">Добавьте организацию</h2>
          <div className="wrapper h-auto">
            <div className="d-flex justify-content-end align-items-center c-green fs-18 mb-4">
              <i className="fa-regular fa-shield-check me-2" />
              Гарантия безопасности
              <Interrogative
                className="ms-2"
                title={arrSelectMarketplace[checkboxActive].tooltipTitle}
                text={arrSelectMarketplace[checkboxActive].tooltipText}
              />
            </div>
            <DefaultInputs
              placeholder="Название магазина"
              onChange={(e: any) =>
                setName({
                  value: e.target.value,
                  error: false
                })
              }
              errorMessage="Название магазина надо заполнять обязательно"
              error={name.error}
              value={name.value}
              title={
                <span className={`${name.error ? 'c-red' : 'c-grey'}  fs-18 mb-1`}>
                  Введите название магазина*
                </span>
              }
            />
            <DefaultInputs
              className="mt-5"
              onChange={(e: any) =>
                setKey({
                  value: e.target.value,
                  error: false
                })
              }
              inpProps={{
                value: key.value
              }}
              error={key.error}
              title={
                <span className={`${key.error ? 'c-red' : 'c-grey'}  fs-18 mb-1`}>
                  Введите API ключ (стандартный)
                </span>
              }
            />
          </div>

          <div className="mt-5">
            <Button variant="contained" className="btn-blue py-4 px-99" onClick={saveChanges}>
              Сохранить
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: '#fff'
                  }}
                  className="ms-2"
                />
              )}
            </Button>
          </div>
        </div>
        <div className="col-5">{infoMarketplace[checkboxActive]}</div>
      </div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!store}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MainTemplate>
  );
}

export default ChangeMarketplace;
