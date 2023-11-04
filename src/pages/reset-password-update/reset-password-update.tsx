import React, { useState } from 'react';
import './reset-password-update.scss';
import Logo from '../../assets/images/logo-site.svg';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import { Button, CircularProgress } from '@mui/material';
import { DEF_INPUT, SITE_URL } from '../../utils/const';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SaveResetPassword } from '../../utils/api';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { AlertSiteTypes } from '../../enums/enums';
import { setAlertError } from '../../utils/helpers';

function ResetPasswordUpdate() {
  const { key } = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<IDefInputs>(DEF_INPUT);
  const [newPasswordRepeat, setNewPasswordRepeat] = useState<IDefInputs>(DEF_INPUT);

  function datChanges(e: any) {
    e.preventDefault();

    if (newPassword.value !== newPasswordRepeat.value) {
      setNewPasswordRepeat({
        value: newPasswordRepeat.value,
        error: 'Пароли не соответствуют'
      });
      setNewPassword({
        value: newPasswordRepeat.value,
        error: 'Пароли не соответствуют'
      });
      return;
    }

    if (key) {
      setLoading(true);
      SaveResetPassword({
        secretKey: key,
        password: newPassword.value
      })
        .then(({ data }) => {
          console.log(data);
          setLoading(false);

          dispatch(
            openAlert({
              status: AlertSiteTypes.success,
              go: true
            })
          );
          dispatch(setMessageAlert('Ваш новый пароль успешно сохранен'));

          setTimeout(() => {
            navigation(`/${SITE_URL.LOGIN}`);
          }, 2000);
        })
        .catch((err) => {
          setAlertError(err);
          setLoading(false);
        });
    }
  }

  return (
    <div className="login">
      <>
        <div className="login-left">
          <div className="login-left-body">
            <div>
              <img src={Logo} alt="login" />
            </div>
            <h1>Добро пожаловать!</h1>
            <p className="login-left-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="login-block">
          <div className="login-block-wrapper">
            <form onSubmit={datChanges}>
              <p className="login-block-wrapper-title">Введите пароль</p>
              <div className="mb-4">
                <DefaultInputs
                  placeholder="Введите пароль"
                  error={newPassword.error}
                  title={
                    <span
                      className={`fs-14 c-red mb-1 ${newPassword.error ? 'd-block' : 'd-none'}`}>
                      <i className="fa-regular fa-circle-exclamation me-2" />
                      {newPassword.error}
                    </span>
                  }
                  inpProps={{
                    type: 'password'
                  }}
                  value={newPassword.value}
                  onChange={(e: any) =>
                    setNewPassword({
                      value: e.target.value,
                      error: false
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <DefaultInputs
                  placeholder="Повторите пароль"
                  error={newPasswordRepeat.error}
                  inpProps={{
                    type: 'password'
                  }}
                  title={
                    <span
                      className={`fs-14 c-red mb-1 ${
                        newPasswordRepeat.error ? 'd-block' : 'd-none'
                      }`}>
                      <i className="fa-regular fa-circle-exclamation me-2" />
                      {newPasswordRepeat.error}
                    </span>
                  }
                  value={newPasswordRepeat.value}
                  onChange={(e: any) =>
                    setNewPasswordRepeat({
                      value: e.target.value,
                      error: false
                    })
                  }
                />
              </div>
              <div className="d-flex justify-content-center align-items-center mt-5">
                <Button
                  variant="contained"
                  className={`btn-green py-3 px-5 ${
                    newPasswordRepeat.error || newPasswordRepeat.error ? 'error' : ''
                  }`}
                  type="submit">
                  Сменить
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
            </form>
            <div className="login-and-register">
              <Link to={SITE_URL.LOGIN}>Войти с паролем</Link>
              <Link to={SITE_URL.REGISTER}>Зарегистрироваться</Link>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default ResetPasswordUpdate;
