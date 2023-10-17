import React, { useState } from 'react';
import './recover-password.scss';
import Logo from '../../assets/images/logo-site.svg';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import { Button, CircularProgress } from '@mui/material';
import { DEF_INPUT, SITE_URL } from '../../utils/const';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function RecoverPassword() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [username, setUsername] = useState<IDefInputs>(DEF_INPUT);
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameChecked, setUsernameChecked] = useState<boolean>(false);

  function nextStep() {
    setUsernameChecked(true);
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
            {usernameChecked ? (
              <>
                <p className="login-block-wrapper-title">Введите пароль</p>
                <div className="mb-4">
                  <DefaultInputs
                    placeholder="Введите пароль"
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
                    placeholder="Повторите пароль"
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
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <Button variant="contained" className="btn-green py-3 px-5">
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
              </>
            ) : (
              <>
                <p className="login-block-wrapper-title">Восстановление пароля</p>
                <div className="mb-4">
                  <DefaultInputs
                    placeholder="Введите логин (Ваш e-mail)"
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
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <Button variant="contained" className="btn-green py-3 px-5" onClick={nextStep}>
                    Восстановить пароль
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
              </>
            )}
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

export default RecoverPassword;
