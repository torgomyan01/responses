import React from 'react';
import './profile-settings.css';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import Payments from './components/payments/payments';

function ProfileSettings() {
  return (
    <div className="CreateProject">
      <div>
        <DefaultInputs placeholder="E-Mail" />
      </div>
      <Payments />
    </div>
  );
}

export default ProfileSettings;
