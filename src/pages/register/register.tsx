import React, { useEffect, useState } from 'react';
import './register.scss';
import Logo from '../../assets/images/logo-site.svg';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import { Button, CircularProgress } from '@mui/material';
import { API_URLS, DEF_INPUT, LocalStorageKeys, SITE_URL } from '../../utils/const';
import { CreateUser, UserLogin } from '../../utils/api';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { AlertSiteTypes } from '../../enums/enums';
import { useDispatch } from 'react-redux';

function Register() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [username, setUsername] = useState<IDefInputs>(DEF_INPUT);
  const [password, setPassword] = useState<IDefInputs>(DEF_INPUT);
  const [repeatPassword, setRepeatPassword] = useState<IDefInputs>(DEF_INPUT);
  const [loading, setLoading] = useState<boolean>(false);
  //const { isAuthenticated } = useLoaderData() as { isAuthenticated: boolean };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigation(`${SITE_URL.MY_ACCOUNT}/${SITE_URL.MY_STORES}`);
  //   }
  // }, [isAuthenticated]);

  function startCreateUser(e: any) {
    e.preventDefault();

    if (!username.value) {
      setUsername({
        value: username.value,
        error: 'Логин должно быть заполнено обязательно'
      });
      return;
    }
    if (!password.value) {
      setPassword({
        value: password.value,
        error: 'Парол должно быть заполнено обязательно'
      });
      return;
    }
    if (!repeatPassword.value) {
      setRepeatPassword({
        value: repeatPassword.value,
        error: 'Парол должно быть заполнено обязательно'
      });
      return;
    }

    if (password.value !== repeatPassword.value) {
      setPassword({
        value: password.value,
        error: 'Пароль и повторный пароль должны быть одинаковыми'
      });
      setRepeatPassword({
        value: repeatPassword.value,
        error: 'Пароль и повторный пароль должны быть одинаковыми'
      });
      return;
    }

    setLoading(true);

    CreateUser({
      username: username.value,
      password: password.value
    })
      .then(({ data }) => {
        LoginUser();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function LoginUser() {
    UserLogin({
      username: username.value,
      password: password.value
    })
      .then(({ data }) => {
        console.log(data);

        dispatch(
          openAlert({
            status: AlertSiteTypes.success,
            go: true
          })
        );
        dispatch(setMessageAlert('Спасибо, вы успешно зарегистрировались'));
        setLoading(false);

        setTimeout(() => {
          navigation(`${SITE_URL.MY_ACCOUNT}/${SITE_URL.PROFILE_SETTINGS}`);
        }, 1500);
      })
      .catch(() => {
        setLoading(false);
      });
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
        <form onSubmit={startCreateUser} className="login-block">
          <div className="login-block-wrapper">
            <p className="login-block-wrapper-title">Регистрация</p>
            <div className="mb-4">
              <DefaultInputs
                placeholder="Логин или E-mail"
                error={username.error}
                title={
                  <span className={`fs-14 c-red mb-1 ${username.error ? 'd-block' : 'd-none'}`}>
                    <i className="fa-regular fa-circle-exclamation me-2" />
                    {username.error}
                  </span>
                }
                onChange={(e: any) =>
                  setUsername({
                    value: e.target.value,
                    error: false
                  })
                }
              />
            </div>
            <div className="mb-4">
              <DefaultInputs
                placeholder="Пароль"
                error={password.error}
                inpProps={{
                  type: 'password'
                }}
                title={
                  <span className={`fs-14 c-red mb-1 ${password.error ? 'd-block' : 'd-none'}`}>
                    <i className="fa-regular fa-circle-exclamation me-2" />
                    {password.error}
                  </span>
                }
                onChange={(e: any) =>
                  setPassword({
                    value: e.target.value,
                    error: false
                  })
                }
              />
            </div>
            <div>
              <DefaultInputs
                placeholder="Повторите пароль"
                error={repeatPassword.error}
                inpProps={{
                  type: 'password'
                }}
                title={
                  <span
                    className={`fs-14 c-red mb-1 ${repeatPassword.error ? 'd-block' : 'd-none'}`}>
                    <i className="fa-regular fa-circle-exclamation me-2" />
                    {repeatPassword.error}
                  </span>
                }
                onChange={(e: any) =>
                  setRepeatPassword({
                    value: e.target.value,
                    error: false
                  })
                }
              />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Button variant="contained" className="btn-green py-3 px-5" type="submit">
                Регистрация
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
            <div className="login-and-register">
              <Link to={SITE_URL.LOGIN}>Войти с паролем</Link>
              <Link to="">Восстановить пароль</Link>
            </div>
          </div>
        </form>
      </>
    </div>
  );
}

export default Register;
