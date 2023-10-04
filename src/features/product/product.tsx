import React, { useState } from 'react';
import StatusButton from '../status-button/status-button';
import { Button, Rating, Tooltip } from '@mui/material';
import DefSwitch from '../switch/switch';
import './product.css';
import img from '../../assets/images/product.png';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GenerateNewResponseRenew } from '../../utils/api';

function Product({ info }: Product) {
  const getResponse = info.feedback.responses[0];
  const [value, setValue] = useState<number | null>(info.feedback.rate);
  const [review, setReview] = useState<boolean>(getResponse.status === 10);
  const [copyNumber, setCopyNumber] = useState(false);

  function openCloseReview() {
    setReview(!review);
  }

  function statusChangedResponse() {
    return getResponse.status === 1 && getResponse.responseType === 1;
  }

  function StartGenerateNewResponse() {
    GenerateNewResponseRenew(getResponse.responseId)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="products-item">
      <div className="products-item-header">
        <div className="d-flex justify-content-start align-items-start">
          <div className="products-item-header-image">
            <img src={info.feedback.product.image} alt="product" />
          </div>
          <div>
            <h2 className="products-item-header-title">{info.feedback.product.title}</h2>
            <ul>
              <li>Организация: {info.feedback.product.title}</li>
              <li>
                Артикул:{' '}
                <CopyToClipboard
                  text={info.feedback.product.externalProductId}
                  onCopy={() => setCopyNumber(true)}>
                  <span className="copy-number">
                    {info.feedback.product.externalProductId}
                    <Tooltip
                      title={copyNumber ? 'Скопировано' : 'Копировать артикул'}
                      placement="top">
                      <i className="fa-regular fa-copy ms-2" />
                    </Tooltip>
                  </span>
                </CopyToClipboard>
              </li>
              <li>Артикул поставщика: {info.feedback.product.title}</li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-end flex-column">
          <StatusButton status={info.feedback.responses[0].status} />
          <div className="products-item-review">
            <span className="products-item-review-name">Оценка:</span>
            <Rating
              name="simple-controlled"
              value={value}
              readOnly
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
          onClick={openCloseReview}>
          <i
            className="fa-solid fa-angle-up trans"
            style={{
              transform: `rotate(${review ? '0' : '180deg'})`
            }}
          />
        </Button>
      </div>

      <div className="overflow-hidden trans" style={{ height: review ? 450 : 0 }}>
        <label className="def-label mt-5">
          <span className="def-label-title">Отзыв</span>
          <input type="text" defaultValue={info.feedback.message} disabled />
        </label>
        <label className="def-label mt-5">
          <span className="def-label-title">Ответ</span>
          <textarea disabled={!statusChangedResponse()} defaultValue={getResponse.message} />
        </label>
        <div className="d-flex justify-content-between align-items-center mt-5">
          <span className="fs-14 c-grey">Дата отзыва: 10.08.2023, 11:10:00</span>
          <div className="d-flex justify-content-end align-items-center">
            <Button
              variant="outlined"
              className="btn-green outlined me-5"
              onClick={StartGenerateNewResponse}>
              Сгенерировать новый отзыв
            </Button>
            <Button variant="contained" className="btn-green py-3 px-5">
              Отправить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
