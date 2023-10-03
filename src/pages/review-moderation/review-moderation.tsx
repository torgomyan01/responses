import React, { useEffect, useState } from 'react';
import './review-moderation.css';
import MainTemplate from '../../features/main-template/main-template';
import { Button, Pagination } from '@mui/material';
import Shape from '../../features/shape/shape';
import product from '../../assets/images/product.png';
import { SITE_URL, STATUS_BUTTON } from '../../utils/const';
import Product from '../../features/product/product';
import { RandomKey } from '../../utils/helpers';
import PaginationCount from '../../features/pagination-count/pagination-count';
import SortingSelect from '../../features/sorting-select/sorting-select';
import { useSelector } from 'react-redux';
import { GetFeedbacksResponse } from '../../utils/api';
import { log } from 'util';
import { Link } from 'react-router-dom';

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

function ReviewModeration() {
  const store = useSelector((state: IUserInfo) => state.UserInfo.activeStore);
  const [reviews, setReviews] = useState<IReviewItem[] | null>(null);

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

  useEffect(() => {
    if (store) {
      GetFeedbacksResponse(store.storeId)
        .then(({ data }) => {
          console.log(data);
          setReviews(data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [store]);

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
      <div className="products">
        {reviews ? (
          reviews.map((info) => <Product key={RandomKey()} info={info} />)
        ) : (
          <div>loading...</div>
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center mt-5">
        <PaginationCount
          array={pageSize}
          active={paginationCount}
          onChange={(value: number) => setPaginationCount(value)}
        />
        <div className="pagination">
          <Pagination
            count={Math.floor(products.length / paginationCount)}
            shape="rounded"
            page={activePage}
            onChange={(e, active) => setActivePage(active)}
          />
        </div>
      </div>
    </MainTemplate>
  );
}

export default ReviewModeration;
