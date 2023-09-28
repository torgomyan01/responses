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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    GetUserStores().then(({ data }) => {
      dispatch(setStores(data));
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={SITE_URL.HOME} element={<ReviewModeration />} />
        <Route path={SITE_URL.CREATE_PROJECT} element={<ProfileSettings />} />
        <Route path={SITE_URL.PROJECT_SETTINGS} element={<ProjectSettings />} />
        <Route path={SITE_URL.CREATE_MARKETPLACE} element={<CreateMarketplace />} />
      </Routes>
    </Router>
  );
}

export default App;
