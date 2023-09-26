import React from 'react';
import './profile-settings.css';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import MainTemplate from '../../features/main-template/main-template';

function ProfileSettings() {
  return (
    <MainTemplate className="reviewModeration">
      <div className="CreateProject">
        <div className="container">
          <div className="SetpUi">
            <div className="inner">
              <div className="box active"></div>
              <div className="border"></div>
              <div className="box"></div>
              <div className="border"></div>
              <div className="box"></div>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}

export default ProfileSettings;
