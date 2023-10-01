import React, { useEffect, useState } from 'react';
import './stores-product.css';
import { Button, Pagination } from '@mui/material';
import Shape from '../../features/shape/shape';
import SortingSelect from '../../features/sorting-select/sorting-select';
import MainTemplate from '../../features/main-template/main-template';
import product from '../../assets/images/product.png';
import { STATUS_BUTTON } from '../../utils/const';
import Calendar from '../../features/calendar/calendar';

const products: Products[] = Array.from({ length: 100 }).map((item, index) => {
  return {
    image: product,
    title: `Шпатели для депиляции, шугаринга, воска, бровей деревянные -----${index + 1}`,
    list: [
      'Организация: ВБ ИП Шишкова О.П.',
      'Артикул: 123123123 ',
      'Артикул поставщика: Узкие-шпатели-100-ИП-Шишкова-О-П'
    ],
    status: STATUS_BUTTON.CLOSED,
    autoSend: false,
    reviews: 2
  };
});

const sortArray = [
  'Сначала новые',
  'Сначала старые',
  'Сначала отправленные',
  'Сначала неотправленные',
  'Рейтинг по возрастанию',
  'Рейтинг по убыванию',
  'Группировка по товару'
];

const pageSize = [10, 50, 100];

function StoresProduct() {
  const [paginationCount, setPaginationCount] = useState<number>(pageSize[0]);
  const [activePage, setActivePage] = useState<number>(1);
  const [activePageArray, setActivePageArray] = useState<Products[]>(
    [...products].slice(0, paginationCount)
  );

  useEffect(() => {
    const firstPageIndex = (activePage - 1) * paginationCount;
    const lastPageIndex = firstPageIndex + paginationCount;
    setActivePageArray(products.slice(firstPageIndex, lastPageIndex));
  }, [paginationCount, activePage]);
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
        <div className="pagination">
          <Pagination
            count={Math.floor(products.length / paginationCount)}
            shape="rounded"
            page={activePage}
            onChange={(e, active) => setActivePage(active)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-5">
        <div>
          <h3 className="fs-3 c-grey mb-2 text-uppercase">все товары проекта</h3>
          <p className="fs-18 c-grey">
            <b>Организация:</b> ИП Шишкова О.П.
          </p>
        </div>
        <div>
          <Calendar />
        </div>
      </div>

      {/*<div className="d-flex justify-content-between align-items-center mt-5">*/}
      {/*  <PaginationCount*/}
      {/*    array={pageSize}*/}
      {/*    active={paginationCount}*/}
      {/*    onChange={(value: number) => setPaginationCount(value)}*/}
      {/*  />*/}
      {/*  <div className="pagination">*/}
      {/*    <Pagination*/}
      {/*      count={Math.floor(products.length / paginationCount)}*/}
      {/*      shape="rounded"*/}
      {/*      page={activePage}*/}
      {/*      onChange={(e, active) => setActivePage(active)}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </MainTemplate>
  );
}

export default StoresProduct;
