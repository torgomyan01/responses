import React from 'react';
import MainTemplate from '../../features/main-template/main-template';
import CreateProject from '../profile-settings/components/create-project/create-project';

function CreateMarketplace() {
  function change(e: any) {
    console.log(e);
  }
  return (
    <MainTemplate className="reviewModeration">
      <CreateProject change={change} />
    </MainTemplate>
  );
}

export default CreateMarketplace;
