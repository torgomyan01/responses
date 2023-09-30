import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReviewModeration from './pages/review-moderation/review-moderation';
import { SITE_URL } from './utils/const';
import './App.css';
import { useDispatch } from 'react-redux';
import { GetUserStores } from './utils/api';
import { setStores } from './redux/user-info';
import ProfileSettings from './pages/profile-settings/profile-settings';
import ProjectSettings from './pages/project-settings/project-settings';
import CreateMarketplace from './pages/create-marketplace/create-marketplace';
import MyStore from './pages/myStore/myStore';
import Login from './pages/login/login';
import Navbar from './features/navbar/navbar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    GetUserStores(5, 0).then(({ data }) => {
      dispatch(setStores(data.items));
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={SITE_URL.HOME} element={<Login />} />
        <Route path={SITE_URL.SETTINGS_REVIEWS} element={<ReviewModeration />} />
        <Route path={SITE_URL.PROFILE_SETTINGS} element={<ProfileSettings />} />
        <Route path={`${SITE_URL.PROJECT_SETTINGS}/:storeId`} element={<ProjectSettings />} />
        <Route path={SITE_URL.CREATE_MARKETPLACE} element={<CreateMarketplace />} />
        <Route path={SITE_URL.MY_STORE} element={<MyStore />} />
      </Routes>
    </Router>
  );
}

export default App;
