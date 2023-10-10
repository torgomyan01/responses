import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { GetUserStores, setupResponseInterceptor } from '../../utils/api';
import { setActiveStore, setStores } from '../../redux/user-info';

const MyAccountPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useLoaderData() as { isAuthenticated: boolean };
  const stores = useSelector((state: IUserInfo) => state.UserInfo.stores);

  useEffect(() => {
    const eject = setupResponseInterceptor(navigate);
    return () => {
      eject();
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      GetUserStores(5, 0).then(({ data }) => {
        dispatch(setStores(data.items));
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (stores.length) {
      dispatch(setActiveStore(stores[0]));
    }
  }, [stores]);

  return <Outlet />;
};

export default MyAccountPage;
