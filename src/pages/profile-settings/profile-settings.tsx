import React from 'react';
import './profile-settings.css';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import MainTemplate from '../../features/main-template/main-template';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import telegram from '../../assets/images/telegram.svg';
import whatsapp from '../../assets/images/whatcap.svg';
import viber from '../../assets/images/viber.svg';

function ProfileSettings() {
  return (
    <MainTemplate className="reviewModeration">
      <div className="CreateProject">
        <div className="StepUi">
          <div className="inner">
            <div className="box active" />
            <div className="border" />
            <div className="box" />
            <div className="border" />
            <div className="box" />
          </div>
        </div>
        <h2 className="def-section-title head-st-1">Настройки профиля</h2>
        <div className="row">
          <div className="col-6">
            <div className="col-12">
              <div className="wrapper">
                <h3 className="wrapperTitle">Личные данные</h3>
                <div className="inner">
                  <div className="input-box input-box2">
                    <DefaultInputs placeholder={'Имя'} />
                  </div>
                  <div className="input-box">
                    <DefaultInputs placeholder={'E-mail'} />
                  </div>
                  <div className="input-box input-box2">
                    <DefaultInputs placeholder={'Отчество'} />
                  </div>
                  <div className="input-box">
                    <DefaultInputs placeholder={'Телефон'} />
                  </div>
                  <div className="input-box input-box2 input-box_Last">
                    <DefaultInputs placeholder={'Фамилия'} />
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
            <div className="col-12">
              <div className="wrapper">
                <h3 className="wrapperTitle">Реквизиты компании (для юрлиц)</h3>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="col-12">
              <div className="wrapper">
                <h3 className="wrapperTitle">Аватар</h3>
              </div>
            </div>
            <div className="col-12">
              <div className="wrapper">
                <h3 className="wrapperTitle">Подключенные банковские карты (автоплатёж)</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}

export default ProfileSettings;