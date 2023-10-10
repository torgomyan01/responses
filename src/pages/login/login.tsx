import React, { useEffect, useState } from 'react';
import './login.scss';
import Logo from '../../assets/images/logo-site.svg';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import { Button, CircularProgress } from '@mui/material';
import { DEF_INPUT, SITE_URL } from '../../utils/const';
import { UserLogin } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuth } from '../../redux/user-info';
import { changeUserAuth } from '../../utils/helpers';

function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const userAuth = useSelector((state: IUserInfo) => state.UserInfo.userAuth);
  const [username, setUsername] = useState<IDefInputs>(DEF_INPUT);
  const [password, setPassword] = useState<IDefInputs>(DEF_INPUT);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userAuth) {
      navigation(SITE_URL.MY_STORES);
    }
  }, [userAuth]);

  function LoginUser(e: any) {
    e.preventDefault();
    if (username && password) {
      setLoading(true);

      UserLogin({
        username: username.value,
        password: password.value
      })
        .then(({ data }) => {
          console.log(data);
          navigation(SITE_URL.MY_STORES);
          setLoading(false);
          dispatch(setUserAuth(true));
          changeUserAuth('1');
        })
        .catch(() => {
          setLoading(false);
          setUsername({
            value: username.value,
            error: true
          });
          setPassword({
            value: password.value,
            error: true
          });
          dispatch(setUserAuth(false));
          changeUserAuth('0');
        });
    }
  }

  return (
    <div className="login">
      {!userAuth && (
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
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <form onSubmit={LoginUser} className="login-block">
            <div className="login-block-wrapper">
              <p className="login-block-wrapper-title">Авторизация</p>
              <div className="mb-4">
                <DefaultInputs
                  placeholder="Логин"
                  error={username.error}
                  title={
                    <span className={`fs-14 c-red mb-1 ${username.error ? 'd-block' : 'd-none'}`}>
                      <i className="fa-regular fa-circle-exclamation me-2" />
                      Неверный логин
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
              <div>
                <DefaultInputs
                  placeholder="Пароль"
                  error={password.error}
                  inpProps={{
                    type: 'password'
                  }}
                  title={
                    <span className={`fs-14 c-red mb-1 ${username.error ? 'd-block' : 'd-none'}`}>
                      <i className="fa-regular fa-circle-exclamation me-2" />
                      Неверный пароль
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
              <div className="d-flex justify-content-center align-items-center mt-4">
                <Button variant="contained" className="btn-green py-3 px-5" type="submit">
                  Войти
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
          </form>
        </>
      )}
    </div>
  );
}

export default Login;
