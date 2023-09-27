import React from 'react';
import DefaultInputs from '../../../../features/defultinputs/Defultinputs';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import whatsapp from '../../../../assets/images/whatcap.svg';
import telegram from '../../../../assets/images/telegram.svg';
import viber from '../../../../assets/images/viber.svg';
import imgUpload from '../../../../assets/images/img-upload.svg';
import { Button, Checkbox } from '@mui/material';
import './settings.css';

const label = {
  inputProps: { 'aria-label': 'Checkbox demo' },
  sx: {
    '& .MuiSvgIcon-root': {
      color: '#61CDA6'
    }
  }
};

function Settings({ change }: ISettings) {
  return (
    <>
      <h2 className="def-section-title head-st-1">Настройки профиля</h2>
      <div className="row">
        <div className="col-6">
          <div className="col-12">
            <div className="wrapper">
              <h3 className="wrapperTitle">Личные данные</h3>
              <div className="inner">
                <div className="input-box input-box2">
                  <DefaultInputs placeholder="Имя" />
                </div>
                <div className="input-box">
                  <DefaultInputs placeholder="E-mail" />
                </div>
                <div className="input-box input-box2">
                  <DefaultInputs placeholder="Отчество" />
                </div>
                <div className="input-box">
                  <DefaultInputs placeholder="Телефон" />
                </div>
                <div className="input-box input-box2 input-box_Last">
                  <DefaultInputs placeholder="Фамилия" />
                </div>
                <div className="input-box input-box_Last">
                  <Dropdown className="DropDown-step">
                    <Dropdown.Toggle
                      className="DropDownBtn-step"
                      variant="success"
                      id="dropdown-basic">
                      Мессенджер для уведомлений
                      <i className="fa-solid fa-caret-down" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="DropDownItem-step">
                      <Dropdown.Item className="DropDownItems-step">
                        <Link to="#" className="links">
                          <img src={whatsapp} alt="whatsapp" />
                          <span>Whats App</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="DropDownItems-step">
                        <Link to="#" className="links">
                          <img src={telegram} alt="whatsapp" />
                          <span>Telegram</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="DropDownItems-step">
                        <Link to="#" className="links">
                          <img src={viber} alt="whatsapp" />
                          <span>Viber</span>
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5">
            <div className="wrapper">
              <h3 className="wrapperTitle">Реквизиты компании (для юрлиц)</h3>
              <DefaultInputs placeholder="Наименование" />
              <div className="input-inn">
                <DefaultInputs placeholder="ИНН" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="col-12">
            <div className="wrapper">
              <h3 className="wrapperTitle">Аватар</h3>
              <label className="label-upload">
                <img src={imgUpload} alt="upload" />
                Загрузить фото
                <input type="file" className="input-upload" />
              </label>
            </div>
          </div>
          <div className="col-12 mt-5">
            <div className="wrapper wrapper-fix-h">
              <h3 className="wrapperTitle">Подключенные банковские карты (автоплатёж)</h3>
              <label className="check-label">
                <Checkbox {...label} defaultChecked />
                <span>Привязать банковскую карту</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Button variant="contained" className="btn-blue py-4 px-99" onClick={() => change(1)}>
          Сохранить
        </Button>
      </div>
    </>
  );
}

export default Settings;
