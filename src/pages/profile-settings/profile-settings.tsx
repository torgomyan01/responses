import React, { useState } from 'react';
import './profile-settings.scss';
import MainTemplate from '../../features/main-template/main-template';
import Settings from './components/settings/settings';
import Payments from './components/payments/payments';
import CreateProject from './components/create-project/create-project';
import { RandomKey } from '../../utils/helpers';

function ProfileSettings() {
  const [steps, setSteps] = useState<number>(0);

  function changeStep(index: number) {
    setSteps(index);
  }

  const stepComponents = [
    <Settings key={RandomKey()} change={changeStep} />,
    <Payments key={RandomKey()} change={changeStep} />,
    <CreateProject key={RandomKey()} change={changeStep} />
  ];
  return (
    <MainTemplate className="reviewModeration">
      <div className="CreateProject">
        <div className="StepUi">
          <div className="inner">
            <div className={`box ${steps === 0 && 'active'}`} />
            <div className="border" />
            <div className={`box ${steps === 1 && 'active'}`} />
            <div className="border" />
            <div className={`box ${steps === 2 && 'active'}`} />
          </div>
        </div>
      </div>
      {stepComponents[steps]}
    </MainTemplate>
  );
}

export default ProfileSettings;
