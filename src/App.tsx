import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import ReviewModeration from './pages/review-moderation/review-moderation';
import { SITE_URL } from './utils/const';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserStores } from './utils/api';
import { setActiveStore, setStores, setUserAuth } from './redux/user-info';
import ProfileSettings from './pages/profile-settings/profile-settings';
import ProjectSettings from './pages/project-settings/project-settings';
import CreateMarketplace from './pages/create-marketplace/create-marketplace';
import MyStore from './pages/myStore/myStore';
import Login from './pages/login/login';
import StoresProduct from './pages/stores-product/stores-product';
import SettingsExpanded from './pages/settings-expanded/settings-expanded';
import { GetUserAuth } from './utils/helpers';
import axios from 'axios';
import PageNotFound from './pages/404/404';

//Without this cookies does not send
axios.defaults.withCredentials = true;

function App() {
  const userAuth = useSelector((state: IUserInfo) => state.UserInfo.userAuth);
  const stores = useSelector((state: IUserInfo) => state.UserInfo.stores);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userAuth) {
      GetUserStores(5, 0).then(({ data }) => {
        dispatch(setStores(data.items));
      });
    }
  }, [userAuth]);

  useEffect(() => {
    if (stores.length) {
      dispatch(setActiveStore(stores[0]));
    }
  }, [stores]);

  return (
    <Router>
      <Routes>
        <Route path={SITE_URL.HOME} element={userAuth ? <MyStore /> : <Login />} />
        {userAuth && (
          <>
            <Route path={SITE_URL.FEEDBACKS} element={<ReviewModeration />} />
            <Route path={SITE_URL.PROFILE_SETTINGS} element={<ProfileSettings />} />
            <Route path={`${SITE_URL.STORE_SETTINGS}/:storeId`} element={<ProjectSettings />} />
            <Route path={SITE_URL.CREATE_MARKETPLACE} element={<CreateMarketplace />} />
            <Route path={SITE_URL.MY_STORES} element={<MyStore />} />
            <Route path={`${SITE_URL.STORE_PRODUCTS}/:storeId`} element={<StoresProduct />} />
            <Route
              path={`${SITE_URL.SETTINGS_EXPANDED}/:storeId/:productId`}
              element={<SettingsExpanded />}
            />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
