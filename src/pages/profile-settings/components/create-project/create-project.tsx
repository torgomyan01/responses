import React, { useState } from 'react';
import { Button, Checkbox } from '@mui/material';
import Interrogative from '../../../../features/Interrogative/Interrogative';
import './create-project.css';
import DefaultInputs from '../../../../features/defultinputs/Defultinputs';
import { RandomKey } from '../../../../utils/helpers';

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
    tooltipText:
      'Ozon lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt oris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum '
  },
  {
    name: 'Яндекс.Маркет',
    tooltipTitle: 'Яндекс.Марке',
    tooltipText:
      'Ozon lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt oris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum '
  },
  {
    name: 'Wildberries',
    tooltipTitle: 'Wildberries',
    tooltipText:
      'Ozon lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt oris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum '
  }
];

function CreateProject({ change }: ICreateProject) {
  const [checkboxActive, setCheckboxActive] = useState<number>(0);
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
              title={<span className="c-grey fs-18 mb-1">Введите название магазина*</span>}
            />
            <DefaultInputs
              className="mt-5"
              value="eyJhbGciOiJIUzI1NiIsInR5cCI6Ik"
              title={<span className="c-grey fs-18 mb-1">Введите API ключ (стандартный)</span>}
            />
          </div>

          <div className="mt-5">
            <Button variant="contained" className="btn-blue py-4 px-99" onClick={() => change(2)}>
              Сохранить
            </Button>
          </div>
        </div>
        <div className="col-5">right</div>
      </div>
    </>
  );
}

export default CreateProject;
