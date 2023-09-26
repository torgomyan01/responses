import React from 'react';
import './Createproject.css';
import DefaultInputs from '../../features/defultinputs/Defultinputs';

function CreateProject() {
  return (
    <div className="CreateProject">
      <div>
        <DefaultInputs placeholder={'E-Mail'} onChange={(e: any) => console.log(e.target.value)} />
      </div>
    </div>
  );
}

export default CreateProject;
