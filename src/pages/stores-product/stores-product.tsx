import React, { useEffect, useState } from 'react';
import './stores-product.scss';
import { Button, CircularProgress, Pagination } from '@mui/material';
import Shape from '../../features/shape/shape';
import SortingSelect from '../../features/sorting-select/sorting-select';
import MainTemplate from '../../features/main-template/main-template';
import { SITE_URL, STATUS_BUTTON } from '../../utils/const';
import Calendar from '../../features/calendar/calendar';
import Select from '../../features/select/select';
import product from '../../assets/images/product.png';
import PaginationCount from '../../features/pagination-count/pagination-count';
import { CreatePageCount, RandomKey } from '../../utils/helpers';
import { Link, useParams } from 'react-router-dom';
import { GetFeedbacksResponse, GetProductsStatistics } from '../../utils/api';
import StProduct from './components/st-product';
import { useSelector } from 'react-redux';

const sortArray = [
  'Сначала новые',
  'Сначала старые',
  'Сначала отправленные',
  'Сначала неотправленные',
  'Рейтинг по возрастанию',
  'Рейтинг по убыванию',
  'Группировка по товару'
];

const pageSize = [10, 20, 50, 100];
const selectItems = ['Сегодня', 'Вчера', '7 дней', '30 дней'];

function StoresProduct() {
  const store = useSelector((state: IUserInfo) => state.UserInfo.activeStore);
  const [products, setProducts] = useState<IStaticsProducts[] | null>(null);
  const [paginationCount, setPaginationCount] = useState<number>(pageSize[0]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(0);

  useEffect(() => {
    StartGetProducts();
  }, [store, activePage, totalCount, paginationCount]);

  function StartGetProducts() {
    if (store && store.storeId) {
      GetProductsStatistics(
        store.storeId,
        paginationCount,
        activePage ? (activePage - 1) * paginationCount : activePage
      )
        .then(({ data }) => {
          setTotalCount(data.totalCount);
          setProducts(data.items);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <MainTemplate className="reviewModeration">
      <div className="d-flex justify-content-between align-items-center">
        <Link to={`../${SITE_URL.MY_STORES}`}>
          <Button variant="contained" className="btn-green py-3 px-4">
            вернуться к списку магазинов
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

      <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
        <div>
          <h3 className="fs-3 c-grey mb-2 text-uppercase">все товары магазина</h3>
          <p className="fs-18 c-grey">
            <b>Организация:</b> {store?.title}
          </p>
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

      {products ? (
        products.map((product) => <StProduct key={RandomKey()} product={product} />)
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
            page={activePage > 0 ? activePage : 1}
            onChange={(e, active) => setActivePage(active)}
          />
        </div>
      </div>
    </MainTemplate>
  );
}

export default StoresProduct;
