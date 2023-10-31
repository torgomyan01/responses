import React from 'react';
import { Button, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { LocalStorageKeys, SITE_URL } from '../../../utils/const';
import { setSelectedProduct } from '../../../redux/user-info';

function StProduct({
  analyticReview = false,
  product
}: {
  analyticReview?: boolean;
  product?: IStaticsProducts;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const store = useSelector((state: IUserInfo) => state.UserInfo.activeStore);

  function selectedProduct() {
    dispatch(setSelectedProduct(product));
    navigate(`../${SITE_URL.MY_ACCOUNT}/${SITE_URL.SETTINGS_EXPANDED}`);
    localStorage.setItem(LocalStorageKeys.selectedProduct, JSON.stringify(product));
  }
  return (
    <div className="product-store mb-4">
      <div className="product-store-info">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="d-flex justify-content-start align-items-start">
              <img src={product?.product.image} alt="Product image" />
              <h3 className="product-store-info-title">{product?.product.title}</h3>
            </div>
            <ul className="list-unstyled mt-3">
              <li className="fs-18 c-grey mb-2">Организация: {store?.title}</li>
              <li className="fs-18 c-grey mb-2">Артикул: {product?.product.externalProductId} </li>
              <li className="fs-18 c-grey mb-2">Штрихкод: {product?.product.sku}</li>
              <li className="fs-18 c-grey mb-2">
                Артикул поставщика: {product?.product.vendorCode}
              </li>
            </ul>
          </div>
          <div className="product-store-info-rating">
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-16 c-grey fw-bolder w-200">Всего отзывов</span>
                <span className="fs-16 c-grey fw-bolder me-5">
                  {product?.statistics.feedbacksCount}
                </span>
                <div className="d-flex justify-content-end align-items-center">
                  <Rating name="read-only" value={1} readOnly />
                  <span className="fs-16 c-grey ms-3 fw-bolder w-35 text-end">
                    {product?.statistics.ratesStatisctics['1']}
                  </span>
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-16 c-grey fw-bolder w-200">Отвеченных отзывов</span>
                <span className="fs-16 c-grey fw-bolder me-5">
                  {product?.statistics.processedFeedbacksCount}
                </span>
                <div className="d-flex justify-content-end align-items-center">
                  <Rating name="read-only" value={2} readOnly />
                  <span className="fs-16 c-grey ms-3 fw-bolder w-35 text-end">
                    {product?.statistics.ratesStatisctics['2']}
                  </span>
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-16 c-grey fw-bolder w-200">Неотвеченных отзывов</span>
                <span className="fs-16 c-grey fw-bolder me-5">
                  {product?.statistics.unrocessedFeedbacksCount}
                </span>
                <div className="d-flex justify-content-end align-items-center">
                  <Rating name="read-only" value={3} readOnly />
                  <span className="fs-16 c-grey ms-3 fw-bolder w-35 text-end">
                    {product?.statistics.ratesStatisctics['3']}
                  </span>
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-16 c-grey fw-bolder w-200">Средний рейтинг</span>
                <span className="fs-16 c-grey fw-bolder me-5">{product?.statistics.avgRate}</span>
                <div className="d-flex justify-content-end align-items-center">
                  <Rating name="read-only" value={4} readOnly />
                  <span className="fs-16 c-grey ms-3 fw-bolder w-35 text-end">
                    {product?.statistics.ratesStatisctics['4']}
                  </span>
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-top mb-3">
                <span className="fs-16 c-grey fw-bolder w-180">Автоответ</span>
                <span className="fs-16 c-grey fw-bolder text-center">
                  {product?.replyMode.replyMode == 'auto' && <>Включен</>}
                  {product?.replyMode.replyMode == 'semi-auto' && (
                    <>
                      Частично
                      <br />
                      включен
                    </>
                  )}
                  {product?.replyMode.replyMode == 'manual' && <>Выключен</>}
                </span>
                <div className="d-flex justify-content-end align-items-top">
                  <Rating name="read-only" value={5} readOnly />
                  <span className="fs-16 c-grey ms-3 fw-bolder w-35 text-end">
                    {product?.statistics.ratesStatisctics['5']}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div
            className="d-lg-flex justify-content-start align-items-center cursor-pointer"
            onClick={selectedProduct}>
            <Button
              variant="contained"
              className="btn-green rounded-2 ps-0 pe-0 me-3"
              sx={{
                minWidth: 40,
                height: 40,
                width: 40
              }}>
              <i className="fa-regular fa-gear fs-24" />
            </Button>
            <span className="fs-16 c-green">Открыть настройки товара</span>
          </div>
          <div>
            <span className="fs-14 c-grey me-5">{/*Дата создания: 10.08.2023, 11:10:00*/}</span>
            <span className="fs-14 c-grey">
              Последние изменения:&nbsp;
              {moment(product?.product.updatedAt).format('MM.DD.YYYY, h:mm:ss')}
            </span>
          </div>
        </div>
      </div>
      {analyticReview && (
        <div className="product-store-text">
          <h3 className="product-store-text-title">Аналитика отзывов</h3>
          <div className="product-store-text-subtitle">Рекомендации:</div>
          <div className="product-store-text-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </div>
        </div>
      )}
    </div>
  );
}

export default StProduct;
