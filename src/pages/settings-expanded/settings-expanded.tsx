import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../../utils/const';
import { Button, CircularProgress, Pagination } from '@mui/material';
import Shape from '../../features/shape/shape';
import SortingSelect from '../../features/sorting-select/sorting-select';
import Product from '../../features/product/product';
import { RandomKey } from '../../utils/helpers';
import PaginationCount from '../../features/pagination-count/pagination-count';
import MainTemplate from '../../features/main-template/main-template';
import Calendar from '../../features/calendar/calendar';
import Select from '../../features/select/select';
import StProduct from '../stores-product/components/st-product';
import Interrogative from '../../features/Interrogative/Interrogative';
import DefSwitch from '../../features/switch/switch';
import DefaultInputs from '../../features/defultinputs/Defultinputs';

const sortArray = [
  'Сначала новые',
  'Сначала старые',
  'Сначала отправленные',
  'Сначала неотправленные',
  'Рейтинг по возрастанию',
  'Рейтинг по убыванию',
  'Группировка по товару'
];

const selectItems = ['Сегодня', 'Вчера', '7 дней', '30 дней'];

function SettingsExpanded() {
  return (
    <MainTemplate className="reviewModeration">
      <div className="d-flex justify-content-between align-items-center">
        <Link to={SITE_URL.MY_STORE}>
          <Button variant="contained" className="btn-green py-3 px-4">
            вернуться к списку товаров
          </Button>
        </Link>
        <Shape />
      </div>
      <hr className="mt-5 mb-5" />
      <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
        <div className="d-flex justify-content-start align-items-center">
          <label className="def-search me-5">
            <i className="fa-solid fa-magnifying-glass" />
            <input type="text" placeholder="Найти товар" />
          </label>
          <SortingSelect items={sortArray} />
        </div>
        <div className="d-lg-flex justify-content-between align-items-center">
          <Calendar />
          <Select selected={selectItems[0]} className="ms-3" items={selectItems} />
          <div>
            <Button
              variant="contained"
              className="btn-green ms-3"
              sx={{
                height: 40,
                width: 160
              }}>
              <i className="fa-solid fa-file-export me-2" />
              Экспорт
            </Button>
          </div>
        </div>
      </div>
      <StProduct analyticReview={false} />

      <h2 className="def-section-title mt-70 mb-5">Настройки текста отзыва</h2>
      <div className="row mt-5">
        <div className="col-6 mb-5 pe-4">
          <div className="wrapper">
            <div className="d-flex justify-content-between align-items-center">
              <Select
                className="w-75 select-project-settings"
                selected="Выберите тональность ответа"
                items={selectItems}
              />
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
          <div className="wrapper">
            <div className="d-flex justify-content-end mb-5">
              <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
                Включить автоответ на отзывы с рейтингом 1
                <DefSwitch className="ms-2" />
              </div>
            </div>
            <form>
              <DefaultInputs
                placeholder="Введите ключевое слово и нажмите Enter"
                title={<span className="c-grey fs-18 mb-2 d-block">Черный список</span>}
                quotation={{
                  text: 'text',
                  title: 'title'
                }}
              />
            </form>
            <div className="todos">
              <div className="todo">
                <span className="fs-16 c-grey">gfhgh</span>
                <i className="fa-regular fa-circle-xmark ms-3" />
              </div>
            </div>
          </div>
        </div>

        <h2 className="def-section-title mt-70 mb-5">Настройки автоответа</h2>
        <div className="row">
          <div className="col-6 mb-5 pe-4">
            <div className="wrapper">
              <div className="d-flex justify-content-end mb-5">
                <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
                  Включить автоответ на отзывы с рейтингом 1
                  <DefSwitch className="ms-2" />
                </div>
              </div>
              <form>
                <DefaultInputs
                  placeholder="Введите ключевое слово и нажмите Enter"
                  title={<span className="c-grey fs-18 mb-2 d-block">Черный список</span>}
                  quotation={{
                    text: 'text',
                    title: 'title'
                  }}
                />
              </form>
              <div className="todos">
                <div className="todo">
                  <span className="fs-16 c-grey">gfhgh</span>
                  <i className="fa-regular fa-circle-xmark ms-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="def-section-title mt-70 mb-5">Пример отзыва</h2>

        <div className="wrapper">
          <div className="row">
            <div className="col-6">
              <label className="def-label">
                <textarea
                  placeholder="Введите пример отзыва, чтобы увидеть пример ответа"
                  style={{
                    height: 260
                  }}
                />
              </label>
            </div>
            <div className="col-6">
              <label className="def-label">
                <textarea
                  style={{
                    height: 260
                  }}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Button variant="contained" className="btn-blue py-4 px-99">
            Сохранить
            <CircularProgress
              size={24}
              sx={{
                color: '#fff'
              }}
              className="ms-2"
            />
          </Button>
        </div>
      </div>
    </MainTemplate>
  );
}

export default SettingsExpanded;
