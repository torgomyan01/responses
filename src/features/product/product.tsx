import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, Rating, Tooltip } from '@mui/material';
import './product.scss';
import img from '../../assets/images/product.png';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ApproveResponse, { RenewResponse } from '../../utils/api';
import { ResponseStatus, ResponseReplyType } from '../../responses-shared/types';

import StatusLabel from '../status-label/status-label';

import moment from 'moment';
import 'moment/locale/ru'; // without this line it didn't work
import { Link } from 'react-router-dom';
import { SITE_URL } from '../../utils/const';
moment.locale('ru');

interface FeedbackResponseReviewProps {
  feedback: IReviewItem;
}

const DummyProductImage = 'https://www.productplan.com/uploads/2018/08/product-development.png';

const FeedbackResponseReview: React.FC<FeedbackResponseReviewProps> = ({ feedback }) => {
  const store = useSelector((state: IUserInfo) => state.UserInfo.activeStore);

  const [copyNumber, setCopyNumber] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [hasResponse, setHasResponse] = useState<boolean>(feedback.response !== null), // Has feedback responses at all, or it's not generater yet
    [response, setResponse] = useState(feedback.response),
    [isAwaitingModeration, setIsAwaitingModeration] = useState<boolean>(
      hasResponse && response?.status === ResponseStatus.AwaitingModeration
    ),
    [isAwaitingPublication, setIsAwaitingPublication] = useState<boolean>(
      hasResponse && response?.status === ResponseStatus.AwaitingPublication
    ),
    [isPublished, setIsPublished] = useState<boolean>(
      hasResponse && response?.status === ResponseStatus.Published
    ),
    [collapsed, setCollapsed] = useState<boolean>(!hasResponse || isPublished), // Collapsed when has response and response was sended
    [manualResponseText, setManualResponseText] = useState<string | null>(null);

  useEffect(() => {
    const hasResponse = response !== null;
    setHasResponse(hasResponse);
    setIsAwaitingModeration(hasResponse && response?.status === ResponseStatus.AwaitingModeration);
    setIsAwaitingPublication(
      hasResponse && response?.status === ResponseStatus.AwaitingPublication
    );
    setIsPublished(hasResponse && response?.status === ResponseStatus.Published);
  }, [response]);

  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }

  function handleRenewResponse() {
    setIsLoading(true);
    if (response) {
      RenewResponse(feedback.storeId, feedback.feedbackId, response.responseId)
        .then(({ data }) => {
          if (data.feedback.responses.length > 0) {
            setResponse(data.feedback.responses[0]);
          } else {
            setResponse(null);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  const [loadingSend, setLoadingSend] = useState(false);

  function handleApproveResponse() {
    setLoadingSend(true);
    if (response) {
      ApproveResponse(
        feedback.storeId,
        feedback.feedbackId,
        response.responseId,
        manualResponseText
      )
        .then(({ data }) => {
          if (data.feedback.responses.length > 0) {
            setResponse(data.feedback.responses[0]);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  const handleResponseTextChange = (text: string) => {
    if (manualResponseText !== response?.message) {
      setManualResponseText(text);
    } else {
      setManualResponseText(null);
    }
  };

  return (
    <div className="products-item">
      <div className="products-item-header">
        {/* {info.feedback.feedbackId} */}
        <div className="d-flex justify-content-start align-items-start">
          <div className="products-item-header-image">
            <img src={feedback.product.image || DummyProductImage} alt="product" />
          </div>
          <div>
            <h2 className="products-item-header-title">{feedback.product.title}</h2>
            <ul>
              <li>Организация: {store?.title}</li>
              <li>Артикул: {feedback.product.externalProductId} </li>
              <li>
                Штрихкод:&nbsp;
                <CopyToClipboard text={feedback.product.sku} onCopy={() => setCopyNumber(true)}>
                  <span className="copy-number">
                    {feedback.product.sku}
                    <Tooltip
                      title={copyNumber ? 'Скопировано' : 'Копировать артикул'}
                      placement="top">
                      <i className="fa-regular fa-copy ms-2" />
                    </Tooltip>
                  </span>
                </CopyToClipboard>
              </li>
              <li>Артикул поставщика: {feedback.product.vendorCode}</li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-end flex-column">
          {!hasResponse && <StatusLabel type="warning" message="Подготовка ответа" spinner />}
          {isAwaitingModeration && <StatusLabel type="danger" message="Не отправлен" />}
          {isAwaitingPublication && <StatusLabel type="warning" message="Публикация" spinner />}
          {isPublished && <StatusLabel type="success" message="Отправлен" />}
          {/* <StatusButton status={info.feedback.responses[0]?.status} /> */}
          <div className="products-item-review">
            <span className="products-item-review-name">Оценка:</span>
            <Rating name="simple-controlled" value={Number(feedback.rate)} readOnly />
          </div>
        </div>
      </div>
      <div className="products-item-change-buttons">
        <div className="d-flex justify-content-start align-items-center">
          <Link to={`../${SITE_URL.PRODUCTS}`}>
            <Button variant="outlined" className="btn-green outlined me-5">
              вернуться к списку товаров
            </Button>
          </Link>

          {hasResponse && (
            <div className="fs-18 c-grey">
              <span className="me-3">Автоответ на отзывы этого товара:</span>
              {response?.approveType === ResponseReplyType.auto ? 'да' : 'нет'}
            </div>
          )}
        </div>
        <Button
          variant="contained"
          className="purple-gray-button"
          sx={{ minWidth: 40, height: 40 }}
          onClick={toggleCollapsed}>
          <i
            className="fa-solid fa-angle-up trans"
            style={{
              transform: `rotate(${!collapsed ? '0' : '180deg'})`
            }}
          />
        </Button>
      </div>

      <div
        className="overflow-hidden trans"
        style={{ height: !collapsed ? (hasResponse ? 450 : 200) : 0 }}>
        <label className="def-label mt-5">
          <span className="def-label-title">Отзыв</span>
          <input type="text" defaultValue={feedback.message} disabled />
        </label>
        {hasResponse && (
          <label className="def-label mt-5">
            <span className="def-label-title">Ответ</span>
            <textarea
              disabled={!isAwaitingModeration}
              defaultValue={response?.message || ''}
              onChange={(e) => handleResponseTextChange(e.target.value)}
            />
          </label>
        )}
        <div className="d-flex justify-content-between align-items-center mt-5">
          <span className="fs-14 c-grey">
            Дата отзыва: {moment(feedback.createdAt).format('DD.MM.YYYY, h:mm:ss')}
          </span>
          {hasResponse && isAwaitingModeration && (
            <div className="d-flex justify-content-end align-items-center">
              <Button
                variant="outlined"
                className="btn-green outlined me-5"
                disabled={isLoading}
                onClick={handleRenewResponse}>
                Сгенерировать новый отзыв
                {isLoading && (
                  <CircularProgress
                    size={22}
                    sx={{
                      color: '#61CDA6'
                    }}
                    className="ms-2"
                  />
                )}
              </Button>
              <Button
                variant="contained"
                disabled={loadingSend}
                className="btn-green py-3 px-5"
                onClick={handleApproveResponse}>
                Отправить
                {loadingSend && (
                  <CircularProgress
                    size={22}
                    sx={{
                      color: '#fff'
                    }}
                    className="ms-2"
                  />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="debug_feedbackId">ID: {feedback.feedbackId}</div>
    </div>
  );
};

export default FeedbackResponseReview;
