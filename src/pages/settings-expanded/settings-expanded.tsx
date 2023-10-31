import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LocalStorageKeys, SITE_URL } from '../../utils/const';
import { Button, CircularProgress, Rating } from '@mui/material';
import Shape from '../../features/shape/shape';
import MainTemplate from '../../features/main-template/main-template';
import Select from '../../features/select/select';
import Interrogative from '../../features/Interrogative/Interrogative';
import DefSwitch from '../../features/switch/switch';
import DefaultInputs from '../../features/defultinputs/Defultinputs';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChangeProductResponseConfiguration,
  GetProductResponseConfiguration
} from '../../utils/api';
import ProjectSettingsWrapper from '../project-settings/components/project-settings-wrapper';
import { changeProductReplyConfiguration, RandomKey } from '../../utils/helpers';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { AlertSiteTypes } from '../../enums/enums';

const selectItemsTitles = ['Дружелюбно', 'Формально'];
const selectItems = [
  {
    value: 'friendly',
    name: selectItemsTitles[0]
  },
  {
    value: 'formal',
    name: selectItemsTitles[1]
  }
];

const selectReplySignatureType = [
  {
    name: 'По умолчанию',
    value: 'default'
  },
  {
    name: 'Название магазина',
    value: 'storeName'
  },
  {
    name: 'Имя бренда',
    value: 'brandName'
  },
  {
    name: 'Своя подпись',
    value: 'custom'
  }
];
const getSelectedProduct = JSON.parse(
  localStorage.getItem(LocalStorageKeys.selectedProduct) as string
);

let changedProductSettings: IProductReplyConfiguration | null = null;

function SettingsExpanded() {
  const dispatch = useDispatch();
  const store = useSelector((state: IUserInfo) => state.UserInfo.activeStore);
  const selectedProduct =
    useSelector((state: IUserInfo) => state.UserInfo.selectedProduct) || getSelectedProduct;
  const [data, setData] = useState<IProductReplyConfiguration | null>(null);
  const [autoReplyAll, setAutoReplyAll] = useState<boolean>(false);
  const [autoReplySettings, setAutoReplySettings] = useState<boolean>(true);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);

  useEffect(() => {
    if (store && store.storeId && selectedProduct) {
      GetProductResponseConfiguration(store.storeId, selectedProduct?.product.productId)
        .then(({ data }) => {
          console.log(data);
          setData(data);
          changedProductSettings = data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [store, selectedProduct]);

  function changeRate(value: string, keyNumber: number) {
    changeProductReplyConfiguration(
      'blacklistKeywords',
      changedProductSettings,
      keyNumber,
      value,
      (result) => {
        changedProductSettings = result;
      }
    );
  }

  function getChangeAutoReply(value: boolean, keyNumber: number) {
    changeProductReplyConfiguration(
      'autoReply',
      changedProductSettings,
      keyNumber,
      value,
      (result) => {
        changedProductSettings = result;
      }
    );
  }

  function changeTalentResponse(value: any) {
    const getValue = selectItems.find((item) => item.name === value);
    if (getValue) {
      Array.from({ length: 5 }).forEach((item, index) => {
        changeProductReplyConfiguration(
          'reviewStyle',
          changedProductSettings,
          index + 1,
          getValue.value,
          (result) => {
            changedProductSettings = result;
          }
        );
      });
    }
  }

  function removeTalentItem(array: string[], keyNumber: number) {
    changeProductReplyConfiguration(
      'blacklistKeywords-remove',
      changedProductSettings,
      keyNumber,
      array,
      (result) => {
        changedProductSettings = result;
      }
    );
  }

  function printValueSelect(value: string | undefined) {
    if (value) {
      switch (value) {
        case selectItems[0].value:
          return selectItemsTitles[0];
        case selectItems[1].value:
          return selectItemsTitles[1];
      }
    } else {
      return '';
    }
  }

  function changeAllReply(value: boolean) {
    setAutoReplyAll(value);
    Array.from({ length: 5 }).forEach((item, index) => {
      changeProductReplyConfiguration(
        'autoReply',
        changedProductSettings,
        index + 1,
        value,
        (result) => {
          changedProductSettings = result;
        }
      );
    });
    setData(changedProductSettings);
  }

  const handleIsAppyRecommendations = (isActive: boolean) => {
    if (data) {
      const newData: IProductReplyConfiguration = {
        ...data
      };
      newData.configuration.replyConfiguration.recommendations.isActive = isActive;
      setData(newData);
    }
  };

  function addRecommendedItem(e: any) {
    e.preventDefault();
    const _data: any = { ...data };
    if (_data.configuration) {
      _data.configuration.replyConfiguration.recommendations.keywords.push(e.target.text.value);
      setData(_data);
      e.target.text.value = '';
      changedProductSettings = _data;
    }
  }
  function changeSku(e: any) {
    e.preventDefault();
    const _data: any = { ...data };
    if (_data.configuration) {
      _data.configuration.replyConfiguration.recommendations.sku = e.target.value;
      setData(_data);
      changedProductSettings = _data;
    }
  }

  function changeReviewPreview(e: any) {
    const _data: any = { ...data };
    if (_data.configuration) {
      _data.configuration.replyConfiguration.recommendations.message = e.target.value;
      setData(_data);
      changedProductSettings = _data;
    }
  }

  function addNewProductReview(value: boolean) {
    const _data: any = { ...data };
    if (_data.configuration) {
      _data.configuration.replyConfiguration.useProductNameInReply = value;
      setData(_data);
      changedProductSettings = _data;
    }
  }
  function changeYourSignature(e: any) {
    const _data: any = { ...data };
    if (_data.configuration) {
      _data.configuration.replyConfiguration.signature.customText = e.target.value;
      setData(_data);
      changedProductSettings = _data;
    }
  }

  function changeReplySignatureType(value: string) {
    const type = selectReplySignatureType.find((item) => item.name === value);
    const _data: any = { ...data };
    if (_data.configuration && type) {
      _data.configuration.replyConfiguration.signature.type = type.value;
      setData(_data);
      changedProductSettings = _data;
    }
  }

  function removeKeywords(value: string) {
    const _data: any = { ...data };
    if (_data.configuration) {
      _data.configuration.replyConfiguration.recommendations.keywords =
        _data.configuration.replyConfiguration.recommendations.keywords.filter(
          (_item: string) => _item !== value
        );
      setData(_data);
      changedProductSettings = _data;
    }
  }

  function changeRecommendSuccess() {
    const _data: any = { ...data };
    if (_data.configuration) {
      _data.configuration.replyConfiguration.recommendations.useKeywords =
        !_data.configuration.replyConfiguration.recommendations.useKeywords;
      setData(_data);
      changedProductSettings = _data;
    }
  }

  function changeIsActive() {
    const _data: any = { ...data };
    _data.isActive = !_data.isActive;
    setData(_data);
    changedProductSettings = _data;
    saveChanges();
  }

  function saveChanges() {
    if (store && store.storeId && selectedProduct) {
      setLoadingSave(true);

      ChangeProductResponseConfiguration(
        store.storeId,
        selectedProduct?.product.productId,
        changedProductSettings
      )
        .then(({ data }) => {
          console.log(data);
          setLoadingSave(false);
          dispatch(
            openAlert({
              status: AlertSiteTypes.success,
              go: true
            })
          );
          dispatch(setMessageAlert('Изменено успешно сохранено'));
        })
        .catch((err) => {
          console.log(err);
          setLoadingSave(false);
        });
    }
  }

  function getSelectedItem() {
    const res = selectReplySignatureType.find(
      (item) => item.value === data?.configuration.replyConfiguration.signature.type
    );
    return res?.name || '';
  }

  return (
    <MainTemplate className="reviewModeration">
      <div className="d-flex justify-content-between align-items-center">
        <Link to={`../${SITE_URL.PRODUCTS}`}>
          <Button variant="contained" className="btn-green py-3 px-4">
            вернуться к списку товаров
          </Button>
        </Link>
        <Shape />
      </div>
      <hr className="mt-5 mb-5" />
      <div className="product-store mb-4">
        <div className="product-store-info">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="d-flex justify-content-start align-items-start">
                <img src={selectedProduct?.product.image} alt="Product image" />
                <h3 className="product-store-info-title">{selectedProduct?.product.title}</h3>
              </div>
              <ul className="list-unstyled mt-3">
                <li className="fs-18 c-grey mb-2">Организация: {store?.title}</li>
                <li className="fs-18 c-grey mb-2">Артикул: {selectedProduct?.product.sku} </li>
                <li className="fs-18 c-grey mb-2">
                  Артикул поставщика: {selectedProduct?.product.vendorCode}
                </li>
              </ul>
            </div>
            <div className="product-store-info-rating">
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fs-16 c-grey fw-bolder w-200">Всего отзывов</span>
                  <span className="fs-16 c-grey fw-bolder me-5">
                    {selectedProduct?.statistics.feedbacksCount}
                  </span>
                  <div className="d-flex justify-content-end align-items-center">
                    <Rating name="read-only" value={1} readOnly />
                    <span className="fs-16 c-grey ms-3 fw-bolder w-35 text-end">
                      {selectedProduct?.statistics.ratesStatisctics['1']}
                    </span>
                  </div>
                </li>
                <li className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fs-16 c-grey fw-bolder w-200">Отвеченных отзывов</span>
                  <span className="fs-16 c-grey fw-bolder me-5">
                    {selectedProduct?.statistics.processedFeedbacksCount}
                  </span>
                  <div className="d-flex justify-content-end align-items-center">
                    <Rating name="read-only" value={2} readOnly />
                    <span className="fs-16 c-grey ms-3 fw-bolder w-35 text-end">
                      {selectedProduct?.statistics.ratesStatisctics['2']}
                    </span>
                  </div>
                </li>
                <li className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fs-16 c-grey fw-bolder w-200">Неотвеченных отзывов</span>
                  <span className="fs-16 c-grey fw-bolder me-5">
                    {selectedProduct?.statistics.unrocessedFeedbacksCount}
                  </span>
                  <div className="d-flex justify-content-end align-items-center">
                    <Rating name="read-only" value={3} readOnly />
                    <span className="fs-16 c-grey ms-3 fw-bolder w-35 text-end">
                      {selectedProduct?.statistics.ratesStatisctics['3']}
                    </span>
                  </div>
                </li>
                <li className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fs-16 c-grey fw-bolder w-200">Средний рейтинг</span>
                  <span className="fs-16 c-grey fw-bolder me-5">
                    {selectedProduct?.statistics.avgRate}
                  </span>
                  <div className="d-flex justify-content-end align-items-center">
                    <Rating name="read-only" value={4} readOnly />
                    <span className="fs-16 c-grey ms-3 fw-bolder w-35 text-end">
                      {selectedProduct?.statistics.ratesStatisctics['4']}
                    </span>
                  </div>
                </li>
                <li className="d-flex justify-content-between align-items-top mb-3">
                  <span className="fs-16 c-grey fw-bolder w-180">Автоответ</span>
                  <span className="fs-16 c-grey fw-bolder text-center">
                    {selectedProduct?.replyMode.replyMode == 'auto' && <>Включен</>}
                    {selectedProduct?.replyMode.replyMode == 'semi-auto' && (
                      <>
                        Частично
                        <br />
                        включен
                      </>
                    )}
                    {selectedProduct?.replyMode.replyMode == 'manual' && <>Выключен</>}
                  </span>
                  <div className="d-flex justify-content-end align-items-top">
                    <Rating name="read-only" value={5} readOnly />
                    <span className="fs-16 c-grey ms-3 fw-bolder w-35 text-end">
                      {selectedProduct?.statistics.ratesStatisctics['5']}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div>
              <div className="fs-14 c-grey me-5">Дата создания: 10.08.2023, 11:10:00</div>
              <div className="fs-14 c-grey">
                Последние изменения:&nbsp;
                {moment(selectedProduct?.product.updatedAt).format('MM.DD.YYYY, h:mm:ss')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {data ? (
        <>
          <div className="row justify-content-end">
            <div className="col-6">
              <div className="wrapper">
                <div className="fs-18 c-grey d-flex justify-content-end align-items-center w-100">
                  Индивидуальная настройка для товара
                  <DefSwitch
                    className="ms-2 me-0"
                    onChangeProps={changeIsActive}
                    status={data?.isActive}
                  />
                </div>
              </div>
            </div>
          </div>
          {data?.isActive && (
            <>
              <h2 className="def-section-title mt-70 mb-5">Настройки текста отзыва</h2>
              <div className="row mt-5">
                <div className="col-6 mb-5 pe-4">
                  <div className="wrapper">
                    <div className="d-flex justify-content-between align-items-center">
                      <Select
                        className="w-75 select-project-settings"
                        selected={printValueSelect(
                          data?.configuration.replyConfiguration.rates['1'].reviewStyle
                        )}
                        items={selectItemsTitles}
                        onChange={changeTalentResponse}
                      />
                      <Interrogative title="Title" text="Text" />
                    </div>
                  </div>
                </div>

                <div className="col-6 mb-5">
                  <div className="wrapper">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
                        Включить автоответ
                        <DefSwitch
                          className="ms-2 me-0"
                          onChangeProps={changeAllReply}
                          status={autoReplyAll}
                        />
                      </div>
                      <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
                        Отвечать на старые отзывы
                        <DefSwitch className="ms-2 me-0" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 mb-5 pe-4">
                  <div className="wrapper">
                    <div className="d-flex justify-content-end mb-5">
                      <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
                        Включить рекомендации
                        <DefSwitch
                          className="ms-2 me-0"
                          status={
                            data.configuration.replyConfiguration.recommendations.isActive || false
                          }
                          onChangeProps={handleIsAppyRecommendations}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <DefaultInputs
                        placeholder="123123123123"
                        title={
                          <span className="c-grey fs-18 mb-2 d-block">Рекомендуемый артикул</span>
                        }
                        value={data.configuration.replyConfiguration.recommendations.sku || ''}
                        onChange={changeSku}
                        quotation={{
                          text: 'text',
                          title: 'title'
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <DefaultInputs
                        placeholder="Вы можете ознакомиться с другими товарами"
                        title={
                          <span className="c-grey fs-18 mb-2 d-block">Текст рекомендации</span>
                        }
                        inpProps={{
                          name: 'text'
                        }}
                        value={data.configuration.replyConfiguration.recommendations.message || ''}
                        onChange={changeReviewPreview}
                        quotation={{
                          text: 'text',
                          title: 'title'
                        }}
                      />
                    </div>
                    {/* <div className="mb-4">
                      <p className="fs-18 c-grey">Предпросмотр отзыва</p>
                      <label className="def-label">
                        <textarea
                          placeholder="Предпросмотр будет доступен после сохранения настроек"
                          style={{
                            height: 147
                          }}
                        />
                      </label>
                    </div> */}
                  </div>
                </div>
                <div className="col-6 mb-5">
                  <div className="row">
                    {/* <div className="col-12 mb-5 d-none">
                      <div className="wrapper h-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="fs-18 c-grey d-flex justify-content-between align-items-center w-100">
                            Добавлять название товара в отзыв
                            <DefSwitch
                              className="ms-2 me-0"
                              onChangeProps={addNewProductReview}
                              status={data.configuration.replyConfiguration.useProductNameInReply}
                            />
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-12">
                      <div className="wrapper">
                        <div className="d-flex justify-content-end mb-5">
                          <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
                            Использовать ключевые слова
                            <DefSwitch
                              className="ms-2 me-0"
                              status={
                                data.configuration.replyConfiguration.recommendations.useKeywords
                              }
                              onChangeProps={changeRecommendSuccess}
                            />
                          </div>
                        </div>
                        <form onSubmit={addRecommendedItem} className="mb-4">
                          <DefaultInputs
                            placeholder="Введите ключевое слово и нажмите Enter"
                            title={
                              <span className="c-grey fs-18 mb-2 d-block">Ключевые слова</span>
                            }
                            disabled={
                              !data.configuration.replyConfiguration.recommendations.useKeywords
                            }
                            inpProps={{
                              name: 'text'
                            }}
                            quotation={{
                              text: 'text',
                              title: 'title'
                            }}
                          />
                        </form>
                        <div className="todos mt-2 mb-">
                          {data.configuration.replyConfiguration.recommendations.keywords.map(
                            (item) => (
                              <div key={RandomKey()} className="todo">
                                <span className="fs-16 c-grey">{item}</span>
                                <i
                                  className="fa-regular fa-circle-xmark ms-3"
                                  onClick={() => removeKeywords(item)}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mb-5">
                  <div className="wrapper">
                    <div className="row">
                      <div className="col-6 pe-4">
                        <p className="fs-18 c-grey">Какую подпись использовать</p>
                        <Select
                          className="select-project-settings"
                          selected={getSelectedItem()}
                          items={selectReplySignatureType.map((item) => item.name)}
                          onChange={changeReplySignatureType}
                        />
                      </div>
                      <div className="col-6">
                        {/*TODO here need to change Placehorder depends on data.configuration.replyConfiguration.signature.type */}
                        <DefaultInputs
                          title={<span className="c-grey fs-18 mb-2 d-block">Своя подпись</span>}
                          onChange={changeYourSignature}
                          value={data.configuration.replyConfiguration.signature.customText || ''}
                          disabled={
                            data.configuration.replyConfiguration.signature.type !== 'custom'
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-content-center mt-70 mb-5">
                  <h2 className="def-section-title">Настройки автоответа</h2>
                  <Button
                    variant="contained"
                    className="purple-gray-button"
                    sx={{ minWidth: 40, height: 40 }}
                    onClick={() => setAutoReplySettings(!autoReplySettings)}>
                    <i
                      className="fa-solid fa-angle-up trans"
                      style={{
                        transform: `rotate(${!autoReplySettings ? '0' : '180deg'})`
                      }}
                    />
                  </Button>
                </div>
                {autoReplySettings && (
                  <div className="row pe-0">
                    <div className="col-6 mb-5">
                      <ProjectSettingsWrapper
                        item={data.configuration.replyConfiguration.rates['1']}
                        index={0}
                        onChange={changeRate}
                        title={'Включить автоответ на отзывы с рейтингом 1'}
                        changeAutoReply={getChangeAutoReply}
                        removeTalentItem={removeTalentItem}
                      />
                    </div>
                    <div className="col-6 mb-5 ps-4 me-0 pe-0">
                      <ProjectSettingsWrapper
                        item={data.configuration.replyConfiguration.rates['2']}
                        index={1}
                        onChange={changeRate}
                        title={'Включить автоответ на отзывы с рейтингом 2'}
                        changeAutoReply={getChangeAutoReply}
                        removeTalentItem={removeTalentItem}
                      />
                    </div>
                    <div className="col-6 mb-5">
                      <ProjectSettingsWrapper
                        item={data.configuration.replyConfiguration.rates['3']}
                        index={2}
                        onChange={changeRate}
                        title={'Включить автоответ на отзывы с рейтингом 3'}
                        changeAutoReply={getChangeAutoReply}
                        removeTalentItem={removeTalentItem}
                      />
                    </div>
                    <div className="col-6 mb-5 ps-4 me-0 pe-0">
                      <ProjectSettingsWrapper
                        item={data.configuration.replyConfiguration.rates['4']}
                        index={3}
                        onChange={changeRate}
                        title={'Включить автоответ на отзывы с рейтингом 4'}
                        changeAutoReply={getChangeAutoReply}
                        removeTalentItem={removeTalentItem}
                      />
                    </div>
                    <div className="col-6 mb-5">
                      <ProjectSettingsWrapper
                        item={data.configuration.replyConfiguration.rates['5']}
                        index={4}
                        onChange={changeRate}
                        title={'Включить автоответ на отзывы с рейтингом 5'}
                        changeAutoReply={getChangeAutoReply}
                        removeTalentItem={removeTalentItem}
                      />
                    </div>
                  </div>
                )}
                {/* 
                <h2 className="def-section-title mt-70 mb-5">Пример отзыва</h2>
                <div className="px-3">
                  <div className="wrapper">
                    <div className="row">
                      <div className="col-6">
                        <label className="def-label">
                          <textarea
                            placeholder="Введите пример отзыва, чтобы увидеть пример ответа"
                            style={{
                              height: 260
                            }}
                          />
                        </label>
                      </div>
                      <div className="col-6">
                        <label className="def-label">
                          <textarea
                            style={{
                              height: 260
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="mt-5">
                  <Button variant="contained" className="btn-blue py-4 px-99" onClick={saveChanges}>
                    Сохранить
                    {loadingSave && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: '#fff'
                        }}
                        className="ms-2"
                      />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
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
    </MainTemplate>
  );
}

export default SettingsExpanded;
