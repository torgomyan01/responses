import React, { useState } from 'react';
import { Button, Checkbox, CircularProgress } from '@mui/material';
import Interrogative from '../../../../features/Interrogative/Interrogative';
import './create-project.css';
import DefaultInputs from '../../../../features/defultinputs/Defultinputs';
import { ChangeDefInputValue, RandomKey } from '../../../../utils/helpers';
import InfoOzon from '../info-ozon/info-ozon';
import InfoWaldberis from '../info-waldberis/info-waldberis';
import { DEF_INPUT, STORES_MARKETPLACE } from '../../../../utils/const';
import { CreateStore } from '../../../../utils/api';
import { Spinner } from 'react-bootstrap';

const label = {
  inputProps: { 'aria-label': 'Checkbox demo', name: 'marketplace' },
  sx: {
    '& .MuiSvgIcon-root': {
      color: '#61CDA6'
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

function CreateProject({ change }: ICreateProject) {
  const [checkboxActive, setCheckboxActive] = useState<number>(0);
  const infoMarketplace = [<InfoOzon key={RandomKey()} />, '', <InfoWaldberis key={RandomKey()} />];
  const [name, setName] = useState<IDefInputs>(DEF_INPUT);
  const [key, setKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  function createMarketplace() {
    if (!name.value) {
      console.log(name);
      setName(ChangeDefInputValue(name.value, true));
      return;
    }
    setLoading(true);
    CreateStore({
      storeType: arrSelectMarketplace[checkboxActive].inShort,
      title: name.value,
      apiToken: key
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
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
              <div key={RandomKey()} className="select-marketplace-item">
                <label>
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
                title="Яндекс.Маркет"
                text="eprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum "
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
              value=""
              onChange={(e: any) => setKey(e.target.value)}
              title={<span className="c-grey fs-18 mb-1">Введите API ключ (стандартный)</span>}
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
