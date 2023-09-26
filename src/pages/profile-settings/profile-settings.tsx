import React from 'react';
import './profile-settings.css';
import DefaultInputs from '../../features/defultinputs/Defultinputs';

function ProfileSettings() {
  return (
    <div className="CreateProject">
      <div>
        <DefaultInputs placeholder="E-Mail" />
      </div>
    </div>
  );
}

export default ProfileSettings;
