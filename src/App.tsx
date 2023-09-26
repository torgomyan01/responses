import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReviewModeration from './pages/review-moderation/review-moderation';
import { SITE_URL } from './utils/const';
import './App.css';
import CreateProject from './pages/createproject/Createproject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={SITE_URL.HOME} element={<ReviewModeration />} />
        <Route path={SITE_URL.CREATE_PROJECT} element={<CreateProject />} />
      </Routes>
    </Router>
  );
}

export default App;
