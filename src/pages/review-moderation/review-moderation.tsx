import React, { useEffect, useMemo, useState } from 'react';
import './review-moderation.scss';
import MainTemplate from '../../features/main-template/main-template';
import { Button, CircularProgress, Pagination } from '@mui/material';
import Shape from '../../features/shape/shape';
import { SITE_URL } from '../../utils/const';
import Product from '../../features/product/product';
import { CreatePageCount, RandomKey } from '../../utils/helpers';
import PaginationCount from '../../features/pagination-count/pagination-count';
import { useSelector } from 'react-redux';
import { GetFeedbacksResponse } from '../../utils/api';
import { Link } from 'react-router-dom';
import SortingOptions from '../../features/sorting-options/sorting-options';
import SearchText from '../../features/search-text/search-text';

const sortOptions = [
  {
    title: 'Сначала новые',
    sort: ['createdAt', 'DESC']
  },
  {
    title: 'Сначала старые',
    sort: ['createdAt', 'ASC']
  },
  {
    title: 'Оценка по возрастанию',
    sort: ['rate', 'ASC']
  },
  {
    title: 'Оценка по убыванию',
    sort: ['rate', 'DESC']
  },
  {
    title: 'Сначала отправленные',
    sort: ['status', 'DESC']
  },
  {
    title: 'Сначала неотправленные',
    sort: ['status', 'ASC']
  }
];

const pageSize = [10, 20, 50, 100];

function ReviewModeration() {
  const store = useSelector((state: IUserInfo) => state.UserInfo.activeStore);
  const [feedbacks, setReviews] = useState<IReviewItem[] | null>(null);

  const [paginationCount, setPaginationCount] = useState<number>(pageSize[0]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(0);
  const [sort, setSort] = useState(sortOptions[0].sort);
  const [searchText, setSearchText] = useState<string>('');
  const [refreshToggle, setRefreshToggle] = useState<boolean>(true);

  // useEffect(() => {
  //   let interval: NodeJS.Timer;
  //   if (store) {
  //     setReviews(null);
  //     GetFeedbacksResponse(
  //       store.storeId,
  //       paginationCount,
  //       activePage ? (activePage - 1) * paginationCount : activePage,
  //       sort,
  //       searchText
  //     )
  //       .then(({ data }) => {
  //         setTotalCount(data.totalCount);
  //         setReviews(data.items);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   },

  // }, [store, activePage, paginationCount, totalCount, sort, searchText]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (store) {
      const loadData = async () => {
        GetFeedbacksResponse(
          store.storeId,
          paginationCount,
          activePage ? (activePage - 1) * paginationCount : activePage,
          sort,
          searchText
        )
          .then(({ data }) => {
            setTotalCount(data.totalCount);
            console.log(data.items[0]);
            setReviews(data.items);
          })
          .catch((err) => {
            console.error(err);
          });
      };

      setReviews(null);
      loadData();
      interval = setInterval(loadData, 10000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [store, activePage, paginationCount, totalCount, sort, searchText, refreshToggle]);

  const onSortChange = (sort: Array<string>) => {
    setSort(sort);
  };

  const onSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <MainTemplate className="reviewModeration">
      <div className="d-flex justify-content-between align-items-center">
        <Link to={`../${SITE_URL.MY_STORES}`}>
          <Button variant="contained" className="btn-green py-3 px-4">
            вернуться к списку магазинов
          </Button>
        </Link>
        <Shape
          onRerfreshClick={() => {
            setRefreshToggle(!refreshToggle);
          }}
        />
      </div>
      <hr className="mt-5 mb-5" />
      <div className="filter-block">
        <div className="d-flex justify-content-start align-items-center">
          <SearchText placeholder="Найти товар" onSearchTextChange={onSearchTextChange} />
          <SortingOptions items={sortOptions} onSelect={onSortChange} />
        </div>
        {feedbacks && (
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
        {feedbacks ? (
          feedbacks.map((feedback) => (
            <Product
              key={`${feedback.feedbackId}-${feedback.status}-${feedback?.response?.responseId}`}
              feedback={feedback}
            />
          ))
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
        {feedbacks && (
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
