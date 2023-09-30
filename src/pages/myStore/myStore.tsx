import React, { useCallback, useEffect, useState } from 'react';
import './myStore.css';
import { Button, CircularProgress, Pagination } from '@mui/material';
import Shape from '../../features/shape/shape';
import MainTemplate from '../../features/main-template/main-template';
import SortingSelect from '../../features/sorting-select/sorting-select';
import checked from '../../assets/images/checked.svg';
import close from '../../assets/images/xmark.svg';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePageCount, GetStoreImage, RandomKey } from '../../utils/helpers';
import PaginationCount from '../../features/pagination-count/pagination-count';
import { DeleteUserStores, GetUserStores } from '../../utils/api';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../../utils/const';
import ProductStorePage from './components/product-store-page/product-store-page';
import { removeStore, setStores } from '../../redux/user-info';

const sortArray = [
  'Сначала новые',
  'Сначала старые',
  'Сначала отправленные',
  'Сначала неотправленные',
  'Рейтинг по возрастанию',
  'Рейтинг по убыванию',
  'Группировка по товару'
];
const pageSize = [3, 50, 100];

function MyStore() {
  const dispatch = useDispatch();
  const [stores, setStoresPage] = useState<null | { statistics: IStatistics; store: IStores }[]>(
    null
  );

  const [paginationCount, setPaginationCount] = useState<number>(pageSize[0]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(0);

  useEffect(() => {
    GetProducts(0);
  }, [activePage]);

  function GetProducts(id: number) {
    setStoresPage(null);
    GetUserStores(paginationCount, activePage ? activePage - 1 : activePage, true)
      .then(({ data }) => {
        console.log(data);
        setTotalCount(data.totalCount);
        setStoresPage(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(removeStore(id));
  }
  return (
    <div className="Mystore">
      <MainTemplate className="reviewModeration">
        <div className="d-flex justify-content-between align-items-center">
          <Link to={SITE_URL.CREATE_MARKETPLACE}>
            <Button variant="contained" className="btn-green py-3 px-4">
              <div className="IconPlus">
                <i className="fa-solid fa-plus" />
              </div>
              добавить магазин
            </Button>
          </Link>
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
              count={CreatePageCount(totalCount, paginationCount)}
              shape="rounded"
              page={activePage > 0 ? activePage : 1}
              onChange={(e, active) => setActivePage(active)}
            />
          </div>
        </div>
        <h2 className="def-section-title title-myStore">Все магазины</h2>
        {stores ? (
          <div className="table-box">
            <table className="my-store-table">
              <thead>
                <tr>
                  <th style={{ borderRadius: 20 }} className="th1">
                    Наименование организации
                  </th>
                  <th>Авторизовано</th>
                  <th>Товаров в отзывах </th>
                  <th>Отзывы без ответа</th>
                  <th>Неотправленных ответов </th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((el) => (
                  <ProductStorePage key={RandomKey()} el={el} change={GetProducts} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <CircularProgress
              size={50}
              sx={{
                color: '#4B4AEF'
              }}
              className="mt-1"
            />
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-5">
          <PaginationCount
            array={pageSize}
            active={paginationCount}
            onChange={(value: number) => setPaginationCount(value)}
          />
          <div className="pagination">
            <Pagination
              count={CreatePageCount(totalCount, paginationCount)}
              shape="rounded"
              page={activePage}
              onChange={(e, active) => setActivePage(active)}
            />
          </div>
        </div>
      </MainTemplate>
    </div>
  );
}

export default MyStore;
