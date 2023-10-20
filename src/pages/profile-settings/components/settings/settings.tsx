import React, { useEffect, useState } from 'react';
import DefaultInputs from '../../../../features/defultinputs/Defultinputs';
import imgUpload from '../../../../assets/images/img-upload.svg';
import { Backdrop, Button, Checkbox, CircularProgress } from '@mui/material';
import './settings.scss';
import { GetUserInfo, SaveUserInfo } from '../../../../utils/api';
import Select from '../../../../features/select/select';
import { openAlert, setMessageAlert } from '../../../../redux/alert-site';
import { AlertSiteTypes } from '../../../../enums/enums';
import { useDispatch } from 'react-redux';
import { validRegex } from '../../../../utils/helpers';

const label = {
  inputProps: { 'aria-label': 'Checkbox demo' },
  sx: {
    '& .MuiSvgIcon-root': {
      color: '#61CDA6'
    }
  }
};

const socSites = ['Whats App', 'Telegram', 'Viber'];
const socSitesValues = ['whatsapp', 'telegram', 'viber'];

function Settings({ change }: ISettings) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<IUserProfile | null>(null);
  const [emailValidator, setEmailValidator] = useState<null | string>(null);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);

  useEffect(() => {
    GetUserInfo()
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function changeName(value: string, key: string) {
    if (userInfo) {
      const _userInfo: any = { ...userInfo };
      const keys = key.split('.');
      setEmailValidator(null);
      if (keys[1]) {
        _userInfo[keys[0]][keys[1]] = value;
      } else {
        _userInfo[keys[0]] = value;
      }
      setUserInfo(_userInfo);
    }
  }

  function changeSelect(value: string) {
    const selectedIndex = socSites.findIndex((item) => item === value);
    if (userInfo && selectedIndex) {
      const _userInfo: any = { ...userInfo };
      _userInfo.messenger = socSitesValues[selectedIndex];
      setUserInfo(_userInfo);
    }
  }

  function saveChanges() {
    if (userInfo) {
      if (!validRegex(userInfo.email)) {
        setEmailValidator('Неправильный адрес');
        return;
      } else {
        setEmailValidator(null);
      }

      setLoadingSave(true);
      SaveUserInfo(userInfo).then((res) => {
        setLoadingSave(false);
        dispatch(
          openAlert({
            status: AlertSiteTypes.success,
            go: true
          })
        );
        dispatch(setMessageAlert('Изменено успешно сохранено'));

        setTimeout(() => change(1), 2000);
      });
    }
  }

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
                  <DefaultInputs
                    placeholder="Имя"
                    value={userInfo?.fio.firstname}
                    onChange={(e: any) => changeName(e.target.value, 'fio.firstname')}
                  />
                </div>
                <div className="input-box">
                  <DefaultInputs
                    placeholder="E-mail"
                    error={!!emailValidator}
                    errorMessage={emailValidator || ''}
                    value={userInfo?.email}
                    onChange={(e: any) => changeName(e.target.value, 'email')}
                  />
                </div>
                <div className="input-box input-box2">
                  <DefaultInputs
                    placeholder="Отчество"
                    value={userInfo?.fio.middlename}
                    onChange={(e: any) => changeName(e.target.value, 'fio.middlename')}
                  />
                </div>
                <div className="input-box">
                  <DefaultInputs
                    placeholder="Телефон"
                    value={userInfo?.phone}
                    onChange={(e: any) => changeName(e.target.value, 'phone')}
                  />
                </div>
                <div className="input-box input-box2 input-box_Last">
                  <DefaultInputs
                    placeholder="Фамилия"
                    value={userInfo?.fio.lastname}
                    onChange={(e: any) => changeName(e.target.value, 'fio.lastname')}
                  />
                </div>
                <div className="input-box input-box_Last">
                  <Select
                    items={socSites}
                    className="settings-select"
                    onChange={changeSelect}
                    selected={
                      socSites[socSitesValues.findIndex((item) => item === userInfo?.messenger)]
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5">
            <div className="wrapper">
              <h3 className="wrapperTitle">Реквизиты компании (для юрлиц)</h3>
              <DefaultInputs
                placeholder="Наименование"
                value={userInfo?.company.name}
                onChange={(e: any) => changeName(e.target.value, 'company.name')}
              />
              <div className="input-inn">
                <DefaultInputs
                  placeholder="ИНН"
                  value={userInfo?.company.inn}
                  onChange={(e: any) => changeName(e.target.value, 'company.inn')}
                />
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
        <Button variant="contained" className="btn-blue py-4 px-99" onClick={saveChanges}>
          Сохранить
          {loadingSave && (
            <CircularProgress
              size={25}
              sx={{
                color: '#FFF'
              }}
              className="ms-2"
            />
          )}
        </Button>
      </div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!userInfo}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Settings;
