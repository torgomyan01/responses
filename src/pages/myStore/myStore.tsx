import React, { useEffect, useState } from 'react';
import './myStore.css';
import { Button, Pagination } from '@mui/material';
import Shape from '../../features/shape/shape';
import MainTemplate from '../../features/main-template/main-template';
import SortingSelect from '../../features/sorting-select/sorting-select';
import checked from '../../assets/images/checked.svg';
import { useSelector } from 'react-redux';
import { RandomKey } from '../../utils/helpers';
import PaginationCount from '../../features/pagination-count/pagination-count';
import { DeleteUserStores } from '../../utils/api';

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
  const stores = useSelector((state: IUserInfo) => state.UserInfo.stores);
  const [paginationCount, setPaginationCount] = useState<number>(pageSize[0]);
  const [activePage, setActivePage] = useState<number>(1);
  const [activePageArray, setActivePageArray] = useState<IStores[]>(
    [...stores].slice(0, paginationCount)
  );

  useEffect(() => {
    const firstPageIndex = (activePage - 1) * paginationCount;
    const lastPageIndex = firstPageIndex + paginationCount;
    setActivePageArray(stores.slice(firstPageIndex, lastPageIndex));
  }, [paginationCount, activePage, stores]);

  console.log(stores);

  return (
    <div className="Mystore">
      <MainTemplate className="reviewModeration">
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="contained" className="btn-green py-3 px-4">
            <div className="IconPlus">
              <i className="fa-solid fa-plus" />
            </div>
            добавить магазин
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
              count={Math.floor(stores.length / paginationCount)}
              shape="rounded"
              page={activePage}
              onChange={(e, active) => setActivePage(active)}
            />
          </div>
        </div>
        <h2 className="def-section-title title-myStore">Все магазины</h2>
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
              {activePageArray.map((el) => (
                <tr key={RandomKey()}>
                  <td>{el.storeType}</td>
                  <td>{el.title}</td>
                  <td>
                    <div className="text-center">
                      <img src={checked} alt="img" />
                    </div>
                  </td>
                  <td>
                    <div className="text-center">101</div>
                  </td>
                  <td>
                    <div className="text-center">210</div>
                  </td>
                  <td className="ACTIONS">
                    <button className="btn-icons">
                      <div className="icons">
                        <i className="fa-light fa-pen" />
                      </div>
                    </button>
                    <button className="btn-icons ms-4">
                      <div className="icons">
                        <i
                          className="fa-light fa-trash"
                          onClick={() => DeleteUserStores(el.storeId)}
                        />
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-5">
          <PaginationCount
            array={pageSize}
            active={paginationCount}
            onChange={(value: number) => setPaginationCount(value)}
          />
          <div className="pagination">
            <Pagination
              count={Math.floor(stores.length / paginationCount)}
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
