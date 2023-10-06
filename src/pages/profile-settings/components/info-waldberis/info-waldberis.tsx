import React from 'react';
import './info-waldberis.css';
import infoWaldberis1 from '../../../../assets/images/info-walberis1.png';
import infoWaldberis2 from '../../../../assets/images/info-walberis2.png';
import infoWaldberis3 from '../../../../assets/images/info-walberis3.png';
import infoWaldberis4 from '../../../../assets/images/info-walberis4.png';

function InfoWaldberis() {
  return (
    <div className="info-waldberis wrapper">
      <h2 className="info-head fs-18 c-grey">как добавить организацию wildberries</h2>
      <div className="mt-3 d-flex fs-16 c-grey">
        1.
        <p className="info-title c-grey fs-16">
          На портале WB Партнёры открываем
          <a href="#">Настройки</a>
        </p>
      </div>
      <img src={infoWaldberis1} alt="wald" />
      <div className="mb-1 mt-2 d-flex fs-16 c-grey">
        2.
        <p className="info-title c-grey fs-16">
          Переходим на вкладку м<a href="#">Доступ к API</a> <br />
          нажимаем <a href="#">Создать новый токен</a>
        </p>
      </div>
      <img src={infoWaldberis2} alt="wald" />
      <div className="mb-1 mt-2 d-flex fs-16 c-grey">
        3.
        <p className="info-title c-grey fs-16">
          Вводим название токена, тип токена<a href="#">Стандартный,</a> <br />
          нажимаем <a href="#">Создать токен</a>
        </p>
      </div>
      <img src={infoWaldberis3} alt="wald3" />
      <div className="mb-1 mt-2 d-flex fs-16 c-grey">
        4.
        <p className="info-title c-grey fs-16">
          Копируем созданный токен и заполняем в форме слева
        </p>
      </div>
      <img src={infoWaldberis4} alt="wald4" />
    </div>
  );
}

export default InfoWaldberis;
