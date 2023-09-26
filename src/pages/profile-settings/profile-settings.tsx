import React from 'react';
import './profile-settings.css';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import MainTemplate from '../../features/main-template/main-template';
import Payments from './components/payments/payments';

function ProfileSettings() {
  return (
    <MainTemplate className="reviewModeration">
      <div className="CreateProject">
        <div className="container">
          <div className="StepUi">
            <div className="inner">
              <div className="box active" />
              <div className="border" />
              <div className="box" />
              <div className="border" />
              <div className="box" />
            </div>
          </div>
          <h2 className="def-section-title head-st-1">Настройки профиля</h2>
        </div>
      </div>
    </MainTemplate>
  );
}

export default ProfileSettings;
