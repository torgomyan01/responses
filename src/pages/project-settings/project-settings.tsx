import React from 'react';
import MainTemplate from '../../features/main-template/main-template';
import { Button } from '@mui/material';
import Shape from '../../features/shape/shape';
import SortingSelect from '../../features/sorting-select/sorting-select';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import Interrogative from '../../features/Interrogative/Interrogative';
import DefSwitch from '../../features/switch/switch';
import ProjectSettingsWrapper from './components/project-settings-wrapper';

const sortArray = [
  'Сначала новые',
  'Сначала старые',
  'Сначала отправленные',
  'Сначала неотправленные',
  'Рейтинг по возрастанию',
  'Рейтинг по убыванию',
  'Группировка по товару'
];

function ProjectSettings() {
  return (
    <MainTemplate className="reviewModeration">
      <div className="d-flex justify-content-between align-items-center">
        <Button variant="contained" className="btn-green py-3 px-4">
          вернуться к списку товаров
        </Button>
        <Shape />
      </div>
      <hr className="mt-5 mb-5" />
      <div className="filter-block">
        <div className="d-flex justify-content-start align-items-center">
          <label className="def-search me-5">
            <i className="fa-solid fa-magnifying-glass" />
            <input type="text" placeholder="Найти товар" />
          </label>
          <SortingSelect items={sortArray} />
        </div>
      </div>
      <h2 className="def-section-title mt-70">общие настройки для всех товаров Магазина</h2>
      <p className="fs-18 c-grey mt-3">
        <b>Организация:</b> ИП Шишкова О.П.
      </p>
      <div className="row">
        <div className="col-6 mb-5 pe-4">
          <div className="wrapper">
            <div className="d-flex justify-content-between align-items-center">
              <DefaultInputs placeholder="Выберите тональность ответа" className="w-75" />
              <Interrogative title="Title" text="Text" />
            </div>
          </div>
        </div>
        <div className="col-6 mb-5 ps-4">
          <div className="wrapper">
            <div className="d-flex justify-content-between align-items-center">
              <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
                Включить автоответ
                <DefSwitch className="ms-2" />
              </div>
              <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
                Отвечать на старые отзывы
                <DefSwitch className="ms-2" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 mb-5 pe-4">
          <ProjectSettingsWrapper title="Включить автоответ на отзывы с рейтингом 1" />
        </div>
      </div>
    </MainTemplate>
  );
}

export default ProjectSettings;
