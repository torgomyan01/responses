import React from 'react';
import DefSwitch from '../../../features/switch/switch';
import DefaultInputs from '../../../features/defultinputs/Defultinputs';

function ProjectSettingsWrapper({ title }: IProjectSettingsWrapper) {
  return (
    <div className="wrapper">
      <div className="d-flex justify-content-end mb-5">
        <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
          {title}
          <DefSwitch className="ms-2" />
        </div>
      </div>
      <DefaultInputs
        placeholder="Введите ключевое слово и нажмите Enter"
        title={<span className="c-grey fs-18 mb-2 d-block">Черный список</span>}
        quotation={{
          text: 'text',
          title: 'title'
        }}
      />
    </div>
  );
}

export default ProjectSettingsWrapper;
