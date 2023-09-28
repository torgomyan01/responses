import React, { useEffect, useState } from 'react';
import MainTemplate from '../../features/main-template/main-template';
import { Button } from '@mui/material';
import Shape from '../../features/shape/shape';
import SortingSelect from '../../features/sorting-select/sorting-select';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import Interrogative from '../../features/Interrogative/Interrogative';
import DefSwitch from '../../features/switch/switch';
import ProjectSettingsWrapper from './components/project-settings-wrapper';
import { Simulate } from 'react-dom/test-utils';
import change = Simulate.change;
import { useParams } from 'react-router-dom';
import { GetStoreInfo } from '../../utils/api';
import { log } from 'util';
import { elGR } from '@mui/material/locale';
import { RandomKey } from '../../utils/helpers';
import Select from '../../features/select/select';

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
  const { storeId } = useParams();
  const [rates, setRates] = useState<IStoreRates[] | null>(null);
  const [data, setData] = useState<IStore | null>(null);

  useEffect(() => {
    if (storeId) {
      GetStoreInfo(storeId).then(({ data }) => {
        setData(data);
        setRates(Object.values(data.configuration.replyConfiguration.rates) || []);
      });
    }
  }, [storeId]);

  console.log(rates);

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
              <Select title={rates ? rates[0].reviewStyle : ''} />
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

        {rates?.map((el, index) => (
          <div key={RandomKey()} className="col-6 mb-5 pe-4">
            <ProjectSettingsWrapper
              item={el}
              title={`Включить автоответ на отзывы с рейтингом  ${index + 1}`}
            />
          </div>
        ))}

        {/*<div className="col-6 mb-5 pe-4">*/}
        {/*  <ProjectSettingsWrapper title="Включить автоответ на отзывы с рейтингом 2" />*/}
        {/*</div>*/}
        {/*<div className="col-6 mb-5 pe-4">*/}
        {/*  <ProjectSettingsWrapper title="Включить автоответ на отзывы с рейтингом 3" />*/}
        {/*</div>*/}
        {/*<div className="col-6 mb-5 pe-4">*/}
        {/*  <ProjectSettingsWrapper title="Включить автоответ на отзывы с рейтингом 4" />*/}
        {/*</div>*/}
        {/*<div className="col-6 mb-5 pe-4">*/}
        {/*  <ProjectSettingsWrapper title="Включить автоответ на отзывы с рейтингом 5" />*/}
        {/*</div>*/}
        <div className="col-12">
          <Button variant="contained" className="btn-blue py-4 px-99">
            Сохранить
          </Button>
        </div>
      </div>
    </MainTemplate>
  );
}

export default ProjectSettings;
