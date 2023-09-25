import React, { useState } from 'react';
import StatusButton from '../status-button/status-button';
import { Button, Rating } from '@mui/material';
import DefSwitch from '../switch/switch';
import './product.css';
import { RandomKey } from '../../utils/helpers';

function Product({ info }: Product) {
  const [value, setValue] = useState<number | null>(info.reviews);
  const [review, setReview] = useState<boolean>(false);
  return (
    <div className="products-item">
      <div className="products-item-header">
        <div className="d-flex justify-content-start align-items-start">
          <div className="products-item-header-image">
            <img src={info.image} alt="product" />
          </div>
          <div>
            <h2 className="products-item-header-title">{info.title}</h2>
            <ul>
              {info.list.map((listItem: string) => (
                <li key={RandomKey()}>{listItem}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-end flex-column">
          <StatusButton status={info.status} text="Не отправлен" />
          <div className="products-item-review">
            <span className="products-item-review-name">Оценка:</span>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
        </div>
      </div>
      <div className="products-item-change-buttons">
        <div className="d-flex justify-content-start align-items-center">
          <Button variant="outlined" className="btn-green outlined me-5">
            вернуться к списку товаров
          </Button>
          <div className="fs-18 c-grey">
            <span className="me-3">Автоответ на отзывы этого товара:</span>
            <DefSwitch />
          </div>
        </div>
        <Button
          variant="contained"
          className="purple-gray-button"
          sx={{ minWidth: 40, height: 40 }}
          onClick={() => setReview(!review)}>
          <i
            className="fa-solid fa-angle-up trans"
            style={{
              transform: `rotate(${review ? '0' : '180deg'})`
            }}
          />
        </Button>
      </div>

      <div className="overflow-hidden trans" style={{ height: review ? 320 : 0 }}>
        <label className="def-label mt-5">
          <span className="def-label-title">Отзыв</span>
          <input type="text" placeholder="sd" />
        </label>
        <label className="def-label mt-5">
          <span className="def-label-title">Ответ</span>
          <textarea
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        </label>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-5">
        <span className="fs-14 c-grey">Дата отзыва: 10.08.2023, 11:10:00</span>
        <div className="d-flex justify-content-end align-items-center">
          <Button variant="outlined" className="btn-green outlined me-5">
            Сгенерировать новый отзыв
          </Button>
          <Button variant="contained" className="btn-green py-3 px-5">
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Product;
