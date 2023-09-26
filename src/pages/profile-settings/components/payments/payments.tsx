import React from 'react';
import DefaultInputs from '../../../../features/defultinputs/Defultinputs';
import './payments.css';
import xmark from '../../../../assets/images/xmark.svg';
import checked from '../../../../assets/images/checked.svg';
import { Button } from '@mui/material';

function Payments() {
  return (
    <>
      <h2 className="def-section-title mb-4">Баланс</h2>
      <div className="row">
        <div className="col-4">
          <DefaultInputs
            className="input-number"
            value={0}
            title={<span className="input-number-title">Пакет ответов, шт.</span>}
          />
        </div>
        <div className="col-4">
          <DefaultInputs
            className="input-number"
            value={0}
            title={<span className="input-number-title">Кол-во оставшихся ответов, шт.</span>}
          />
        </div>
        <div className="col-4">
          <DefaultInputs
            className="input-number"
            value={0}
            title={<span className="input-number-title">Кол-во обработанных отзывов, шт. </span>}
          />
        </div>
      </div>
      <h2 className="def-section-title mb-4 mt-5">выбрать тариф</h2>
      <div className="price-list">
        <div className="price-list-left-list">
          <div className="price-list-left-list-item">аналитика </div>
          <div className="price-list-left-list-item">количество отзывов </div>
          <div className="price-list-left-list-item">срок тарифа </div>
          <div className="price-list-left-list-item">стоимость </div>
        </div>
        <div className="price-list-prices">
          <div className="price-list-col">
            <div className="price-list-col-item title">демо</div>
            <div className="price-list-col-item">
              <img src={xmark} alt="icon" />
            </div>
            <div className="price-list-col-item">100</div>
            <div className="price-list-col-item">14</div>
            <div className="price-list-col-item">1 ₽</div>
            <div className="price-list-col-item">
              <Button variant="contained" className="btn-green py-2 px-4">
                купить
              </Button>
            </div>
          </div>
          <div className="price-list-col">
            <div className="price-list-col-item title">старт</div>
            <div className="price-list-col-item">
              <img src={checked} alt="icon" />
            </div>
            <div className="price-list-col-item">100</div>
            <div className="price-list-col-item">30</div>
            <div className="price-list-col-item">500 ₽</div>
            <div className="price-list-col-item">
              <Button variant="contained" className="btn-green py-2 px-4">
                купить
              </Button>
            </div>
          </div>
          <div className="price-list-col">
            <div className="price-list-col-item title">оптима</div>
            <div className="price-list-col-item">
              <img src={checked} alt="icon" />
            </div>
            <div className="price-list-col-item">300</div>
            <div className="price-list-col-item">30</div>
            <div className="price-list-col-item">990 ₽</div>
            <div className="price-list-col-item">
              <Button variant="contained" className="btn-green py-2 px-4">
                купить
              </Button>
            </div>
          </div>
          <div className="price-list-col">
            <div className="price-list-col-item title">оптима +</div>
            <div className="price-list-col-item">
              <img src={checked} alt="icon" />
            </div>
            <div className="price-list-col-item">1 000</div>
            <div className="price-list-col-item">30</div>
            <div className="price-list-col-item">1 990 ₽</div>
            <div className="price-list-col-item">
              <Button variant="contained" className="btn-green py-2 px-4">
                купить
              </Button>
            </div>
          </div>
          <div className="price-list-col">
            <div className="price-list-col-item title">профи</div>
            <div className="price-list-col-item">
              <img src={checked} alt="icon" />
            </div>
            <div className="price-list-col-item">5 000</div>
            <div className="price-list-col-item">30</div>
            <div className="price-list-col-item">7 900 ₽</div>
            <div className="price-list-col-item">
              <Button variant="contained" className="btn-green py-2 px-4">
                купить
              </Button>
            </div>
          </div>
          <div className="price-list-col">
            <div className="price-list-col-item title">профи +</div>
            <div className="price-list-col-item">
              <img src={checked} alt="icon" />
            </div>
            <div className="price-list-col-item">10 000</div>
            <div className="price-list-col-item">30</div>
            <div className="price-list-col-item">8 900 ₽</div>
            <div className="price-list-col-item">
              <Button variant="contained" className="btn-green py-2 px-4">
                купить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payments;
