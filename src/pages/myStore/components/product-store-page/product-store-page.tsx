import React, { useState } from 'react';
import { GetStoreImage, RandomKey } from '../../../../utils/helpers';
import checked from '../../../../assets/images/checked.svg';
import close from '../../../../assets/images/xmark.svg';
import { Link, useNavigate } from 'react-router-dom';
import { SITE_URL } from '../../../../utils/const';
import { CircularProgress, Tooltip } from '@mui/material';
import { DeleteUserStores } from '../../../../utils/api';
import { useDispatch } from 'react-redux';
import { setActiveStore } from '../../../../redux/user-info';

function ProductStorePage({
  el,
  change
}: {
  el: { statistics: IStatistics; store: IStores };
  change: any;
}) {
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const dispatch = useDispatch(),
    navigate = useNavigate();

  function removeStores(id: number | undefined) {
    if (id) {
      setLoadingRemove(true);
      DeleteUserStores(id)
        .then(({ data }) => {
          change(id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleGoToStore = (store: IStores) => {
    dispatch(setActiveStore(store));
    navigate(`../${SITE_URL.FEEDBACKS}`);
  };

  const handleGoToStoreChange = (store: IStores) => {
    dispatch(setActiveStore(store));
    navigate(`../${SITE_URL.CHANGE_MARKETPLACE}`);
  };

  return (
    <tr>
      <td>
        <div
          className="d-flex justify-content-start align-items-start"
          style={{ cursor: 'pointer' }}
          onClick={() => handleGoToStore(el.store)}>
          <img src={GetStoreImage(el.store.storeType)} alt="img" className="me-2 mt-1" />
          {el.store.title}
        </div>
      </td>
      <td>
        <div className="text-center">
          <img src={el.store.isAuthorized ? checked : close} alt="img" />
        </div>
      </td>
      <td>
        <div className="text-center">{el.statistics.productsWithFeedbacksCount}</div>
      </td>
      <td>
        <div className="text-center">{el.statistics.unrocessedFeedbacksCount}</div>
      </td>
      <td>
        <div className="text-center">{el.statistics.unsetResponsesCount}</div>
      </td>
      <td className="ACTIONS">
        <Tooltip title="Редактировать" placement="top">
          <button className="btn-icons" onClick={() => handleGoToStoreChange(el.store)}>
            <div className="icons">
              <i className="fa-light fa-pen" />
            </div>
          </button>
        </Tooltip>

        {loadingRemove ? (
          <CircularProgress
            size={18}
            sx={{
              color: '#4B4AEF'
            }}
            className="ms-3"
          />
        ) : (
          <button className="btn-icons ms-4">
            <div className="icons">
              <i className="fa-light fa-trash" onClick={() => removeStores(el.store.storeId)} />
            </div>
          </button>
        )}
      </td>
    </tr>
  );
}

export default ProductStorePage;
