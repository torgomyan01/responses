import react from 'react';
import './info-ozon.scss';
import infozon1 from '../../../../assets/images/info-ozon1.png';
import infoozon2 from '../../../../assets/images/info-ozon2.png';
import infoozon3 from '../../../../assets/images/info-ozon3.png';

function InfoOzon() {
  return (
    <div className="info-ozon wrapper">
      <h2 className="info-head fs-18 c-grey">как добавить организацию ozon</h2>
      <div className="mt-3 mb-2 d-flex fs-16 c-grey">
        1.
        <p className="info-title c-grey fs-16">
          На портале Ozon Seller открываем
          <a href="#">Настройки</a>
        </p>
      </div>
      <img src={infozon1} alt="wald" />
      <div className="mb-2 mt-2 d-flex fs-16 c-grey">
        2.
        <p className="info-title c-grey fs-16">
          Добавляете наш логин в качестве менеджера по продвижению
        </p>
      </div>
      <img src={infoozon2} alt="wald" />
      <img src={infoozon3} alt="wald3" />
    </div>
  );
}

export default InfoOzon;
