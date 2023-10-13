import React, { useEffect, useState } from 'react';
import './review-moderation.scss';
import MainTemplate from '../../features/main-template/main-template';
import { Button, CircularProgress, Pagination } from '@mui/material';
import Shape from '../../features/shape/shape';
import { SITE_URL } from '../../utils/const';
import Product from '../../features/product/product';
import { CreatePageCount, RandomKey } from '../../utils/helpers';
import PaginationCount from '../../features/pagination-count/pagination-count';
import SortingSelect from '../../features/sorting-select/sorting-select';
import { useSelector } from 'react-redux';
import { GetFeedbacksResponse } from '../../utils/api';
import { Link } from 'react-router-dom';

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

function ReviewModeration() {
  const store = useSelector((state: IUserInfo) => state.UserInfo.activeStore);
  const [reviews, setReviews] = useState<IReviewItem[] | null>(null);

  const [paginationCount, setPaginationCount] = useState<number>(pageSize[0]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(0);

  useEffect(() => {
    if (store) {
      setReviews(null);
      GetFeedbacksResponse(
        store.storeId,
        paginationCount,
        activePage ? (activePage - 1) * paginationCount : activePage
      )
        .then(({ data }) => {
          setTotalCount(data.totalCount);
          setReviews(data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [store, activePage, paginationCount, totalCount]);

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
        {reviews && (
          <div className="pagination">
            <Pagination
              count={CreatePageCount(totalCount, paginationCount)}
              shape="rounded"
              page={activePage > 0 ? activePage : 1}
              onChange={(e, active) => setActivePage(active)}
            />
          </div>
        )}
      </div>
      <div className="products">
        {reviews ? (
          reviews.map((info) => <Product key={info.feedback.feedbackId} info={info} />)
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
      </div>
      <div className="d-flex justify-content-between align-items-center mt-5">
        <PaginationCount
          array={pageSize}
          active={paginationCount}
          onChange={(value: number) => setPaginationCount(value)}
        />
        {reviews && (
          <div className="pagination">
            <Pagination
              count={CreatePageCount(totalCount, paginationCount)}
              shape="rounded"
              page={activePage > 0 ? activePage : 1}
              onChange={(e, active) => setActivePage(active)}
            />
          </div>
        )}
      </div>
    </MainTemplate>
  );
}

export default ReviewModeration;
