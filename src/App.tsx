import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect
} from 'react-router-dom';
import ReviewModeration from './pages/review-moderation/review-moderation';
import { SITE_URL } from './utils/const';
import './App.scss';
import ProfileSettings from './pages/profile-settings/profile-settings';
import ProjectSettings from './pages/project-settings/project-settings';
import CreateMarketplace from './pages/create-marketplace/create-marketplace';
import MyStore from './pages/myStore/myStore';
import Login from './pages/login/login';
import StoresProduct from './pages/stores-product/stores-product';
import SettingsExpanded from './pages/settings-expanded/settings-expanded';
import PageNotFound from './pages/404/404';
import AlertSite from './features/alert/alert';
import axios from 'axios';
import MyAccountPage from './pages/myaccount/myaccount';

const App: React.FC = () => {
  const AuthLoader = () => {
    return axios
      .create()
      .get('/api/v1/user/status')
      .then((_) => {
        return { isAuthenticated: true };
      })
      .catch((error) => {
        return { isAuthenticated: false };
      });
  };

  const AuthLoaderRedirect = () => {
    return axios
      .create()
      .get('/api/v1/user/status')
      .then((_) => {
        return { isAuthenticated: true };
      })
      .catch((error) => {
        return redirect(SITE_URL.LOGIN);
      });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/">
          {/* Temporary redirect / to /login */}
          <Route index element={<Navigate to={SITE_URL.LOGIN} />} />
          <Route path={SITE_URL.LOGIN} element={<Login />} loader={AuthLoader} />
          <Route path={SITE_URL.MYACCOUNT} loader={AuthLoaderRedirect} element={<MyAccountPage />}>
            <Route
              path={SITE_URL.FEEDBACKS}
              loader={AuthLoaderRedirect}
              element={<ReviewModeration />}
            />
            <Route
              path={SITE_URL.PROFILE_SETTINGS}
              loader={AuthLoaderRedirect}
              element={<ProfileSettings />}
            />
            <Route
              path={SITE_URL.STORE_SETTINGS}
              loader={AuthLoaderRedirect}
              element={<ProjectSettings />}
            />
            <Route
              path={SITE_URL.CREATE_MARKETPLACE}
              loader={AuthLoaderRedirect}
              element={<CreateMarketplace />}
            />
            <Route path={SITE_URL.MY_STORES} loader={AuthLoaderRedirect} element={<MyStore />} />
            <Route
              path={SITE_URL.PRODUCTS}
              loader={AuthLoaderRedirect}
              element={<StoresProduct />}
            />
            <Route
              path={`${SITE_URL.SETTINGS_EXPANDED}/:storeId/:productId`}
              loader={AuthLoaderRedirect}
              element={<SettingsExpanded />}
            />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <AlertSite />
    </>
  );
};

export default App;
