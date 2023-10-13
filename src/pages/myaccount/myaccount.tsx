import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { GetUserStores, setupResponseInterceptor } from '../../utils/api';
import { setActiveStore, setStores } from '../../redux/user-info';
import { LocalStorageKeys } from '../../utils/const';

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
      const getActiveStoreId = localStorage.getItem(LocalStorageKeys.activeStore) || 0;
      const getActiveStore = stores.find((store) => store.storeId === +getActiveStoreId);
      dispatch(setActiveStore(getActiveStore || stores[0]));
    }
  }, [stores]);

  return <Outlet />;
};

export default MyAccountPage;
