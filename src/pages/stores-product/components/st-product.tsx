import React from 'react';
import product from '../../../assets/images/product.png';
import { Button, Rating } from '@mui/material';

function StProduct({ analyticReview = true }: { analyticReview?: boolean }) {
  return (
    <div className="product-store mb-4">
      <div className="product-store-info">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="d-flex justify-content-start align-items-start">
              <img src={product} alt="Product image" />
              <h3 className="product-store-info-title">
                Шпатели для депиляции, шугаринга, воска, бровей деревянные
              </h3>
            </div>
            <ul className="list-unstyled mt-3">
              <li className="fs-18 c-grey mb-2">Организация: ВБ ИП Шишкова О.П.</li>
              <li className="fs-18 c-grey mb-2">Артикул: 123123123 </li>
              <li className="fs-18 c-grey mb-2">
                Артикул поставщика: Узкие-шпатели-100-ИП-Шишкова-О-П
              </li>
            </ul>
          </div>
          <div className="product-store-info-rating">
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-16 c-grey fw-bolder w-200">Всего отзывов</span>
                <span className="fs-16 c-grey fw-bolder me-5">8</span>
                <div className="d-flex justify-content-end align-items-center">
                  <Rating name="read-only" value={1} readOnly />
                  <span className="fs-16 c-grey ms-3 fw-bolder">0</span>
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-16 c-grey fw-bolder w-200">Отвеченных отзывов</span>
                <span className="fs-16 c-grey fw-bolder me-5">5</span>
                <div className="d-flex justify-content-end align-items-center">
                  <Rating name="read-only" value={2} readOnly />
                  <span className="fs-16 c-grey ms-3 fw-bolder">0</span>
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-16 c-grey fw-bolder w-200">Неотвеченных отзывов</span>
                <span className="fs-16 c-grey fw-bolder me-5">3</span>
                <div className="d-flex justify-content-end align-items-center">
                  <Rating name="read-only" value={2} readOnly />
                  <span className="fs-16 c-grey ms-3 fw-bolder">0</span>
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-16 c-grey fw-bolder w-200">Средний рейтинг</span>
                <span className="fs-16 c-grey fw-bolder me-5">4,91</span>
                <div className="d-flex justify-content-end align-items-center">
                  <Rating name="read-only" value={4} readOnly />
                  <span className="fs-16 c-grey ms-3 fw-bolder">2</span>
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-16 c-grey fw-bolder w-200">Автоответ</span>
                <span className="fs-16 c-grey fw-bolder me-5">Включен</span>
                <div className="d-flex justify-content-end align-items-center">
                  <Rating name="read-only" value={5} readOnly />
                  <span className="fs-16 c-grey ms-3 fw-bolder">6</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="d-lg-flex justify-content-start align-items-center">
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
            <span className="fs-14 c-grey me-5">Дата создания: 10.08.2023, 11:10:00</span>
            <span className="fs-14 c-grey">Последние изменения: 20.08.2023, 11:10:00</span>
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
