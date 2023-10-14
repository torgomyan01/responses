import React, { useEffect, useState } from 'react';
import { Button, Checkbox, CircularProgress } from '@mui/material';
import Interrogative from '../../../../features/Interrogative/Interrogative';
import './create-project.scss';
import DefaultInputs from '../../../../features/defultinputs/Defultinputs';
import { ChangeDefInputValue, checkNumberOfString, RandomKey } from '../../../../utils/helpers';
import InfoOzon from '../info-ozon/info-ozon';
import InfoWaldberis from '../info-waldberis/info-waldberis';
import { DEF_INPUT, SITE_URL, STORES_MARKETPLACE } from '../../../../utils/const';
import { CreateStore } from '../../../../utils/api';
import { useDispatch } from 'react-redux';
import { updateStores } from '../../../../redux/user-info';
import { useNavigate } from 'react-router-dom';

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
    enabled: false,
    tooltipText: 'Скоро будет доступно'
  },
  {
    name: 'Яндекс.Маркет',
    tooltipTitle: 'Яндекс.Маркет',
    inShort: '',
    enabled: false,
    tooltipText: 'Скоро будет доступно'
  },
  {
    name: 'Wildberries',
    tooltipTitle: 'Wildberries',
    inShort: '',
    enabled: true,
    tooltipText:
      'Wildberries - это крупнейший российский онлайн-ритейлер, специализирующийся на продаже одежды, обуви, товаров для дома и электроники. Компания была основана в 2004 году и предлагает широкий ассортимент товаров от различных брендов, а также собственных марок. Wildberries оперирует как в России, так и за ее пределами, включая страны СНГ и Европы.'
  }
];

STORES_MARKETPLACE.forEach((item, index) => {
  arrSelectMarketplace[index].inShort = item.name;
});

function CreateProject({ change }: ICreateProject) {
  const dispatch = useDispatch();
  const [checkboxActive, setCheckboxActive] = useState<number>(2);
  const infoMarketplace = [<InfoOzon key={RandomKey()} />, '', <InfoWaldberis key={RandomKey()} />];
  const [name, setName] = useState<IDefInputs>(DEF_INPUT);
  const [key, setKey] = useState<IDefInputs>(DEF_INPUT);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function createMarketplace() {
    if (!name.value) {
      setName(ChangeDefInputValue(name.value, true));
      return;
    }
    if (!key.value) {
      setKey(ChangeDefInputValue(key.value, true));
      return;
    }
    setLoading(true);
    CreateStore({
      storeType: arrSelectMarketplace[checkboxActive].inShort,
      title: name.value,
      apiToken: key.value
    })
      .then((res) => {
        navigate(`${SITE_URL.MY_ACCOUNT}/${SITE_URL.MY_STORES}`);
        setLoading(false);
        dispatch(updateStores(res.data));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <>
      <h2 className="def-section-title mb-4">выберите маркетплейс</h2>
      <div className="row">
        <div className="col-7">
          <div className="select-marketplace">
            {arrSelectMarketplace.map((item, index) => (
              <div key={item.name} className="select-marketplace-item">
                <label className="d-flex justify-content-start align-items-center me-2">
                  <Checkbox
                    {...label}
                    checked={checkboxActive === index}
                    onChange={() => setCheckboxActive(index)}
                    disabled={!item.enabled}
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
            <Button variant="contained" className="btn-blue py-4 px-99" onClick={createMarketplace}>
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
    </>
  );
}

export default CreateProject;
