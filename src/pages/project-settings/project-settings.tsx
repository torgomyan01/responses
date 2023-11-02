import React, { useEffect, useState } from 'react';
import './project-settings.scss';
import MainTemplate from '../../features/main-template/main-template';
import { Button, CircularProgress } from '@mui/material';
import Shape from '../../features/shape/shape';
import SortingSelect from '../../features/sorting-select/sorting-select';
import Interrogative from '../../features/Interrogative/Interrogative';
import DefSwitch from '../../features/switch/switch';
import ProjectSettingsWrapper from './components/project-settings-wrapper';
import { GetStoreInfo, SaveStoreInfo } from '../../utils/api';
import { changeProductSettings } from '../../utils/helpers';
import Select from '../../features/select/select';
import { useDispatch, useSelector } from 'react-redux';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { AlertSiteTypes } from '../../enums/enums';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../../utils/const';
import store from '../../app/store';
import DefaultInputs from '../../features/defultinputs/Defultinputs';

const sortArray = [
  'Сначала новые',
  'Сначала старые',
  'Сначала отправленные',
  'Сначала неотправленные',
  'Рейтинг по возрастанию',
  'Рейтинг по убыванию',
  'Группировка по товару'
];

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

// Дружелюбно Формальный

let changedProductSettings: IStore | null = null;

function ProjectSettings() {
  const dispatch = useDispatch();
  const store = useSelector((state: IUserInfo) => state.UserInfo.activeStore);
  const [productSettings, setProductSettings] = useState<IStore | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [autoReplyAll, setAutoReplyAll] = useState<boolean>(false);

  useEffect(() => {
    if (store && store.storeId) {
      setProductSettings(null);
      changedProductSettings = null;
      GetStoreInfo(store.storeId).then(({ data }: { data: IStore }) => {
        setProductSettings(data);
        changedProductSettings = data;
      });
    }
  }, [store]);

  useEffect(() => {
    if (productSettings) {
      const check = Object.values(productSettings.configuration.replyConfiguration.rates).some(
        (item) => item.autoReply
      );
      setAutoReplyAll(check);
    }
  }, [productSettings]);

  function changeRate(value: string, keyNumber: number) {
    changeProductSettings(
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
    changeProductSettings('autoReply', changedProductSettings, keyNumber, value, (result) => {
      changedProductSettings = result;
    });
  }

  function changeTalentResponse(value: any) {
    const getValue = selectItems.find((item) => item.name === value);
    if (getValue) {
      Array.from({ length: 5 }).forEach((item, index) => {
        changeProductSettings(
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
    changeProductSettings(
      'blacklistKeywords-remove',
      changedProductSettings,
      keyNumber,
      array,
      (result) => {
        changedProductSettings = result;
      }
    );
  }

  /**
   * SAVE CHANGES
   */
  function saveChanges() {
    if (store && store.storeId) {
      setLoading(true);
      SaveStoreInfo(store.storeId, changedProductSettings)
        .then(({ data }) => {
          setLoading(false);
          dispatch(
            openAlert({
              status: AlertSiteTypes.success,
              go: true
            })
          );
          dispatch(setMessageAlert('Изменено успешно сохранено'));
          setProductSettings(changedProductSettings);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.response.status === 500) {
            dispatch(
              openAlert({
                status: AlertSiteTypes.error,
                go: true
              })
            );
            dispatch(setMessageAlert('Произошла ошибка. Пожалуйста, попробуйте еще раз'));
          }
        });
    }
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
      changeProductSettings('autoReply', changedProductSettings, index + 1, value, (result) => {
        changedProductSettings = result;
      });
    });
    setProductSettings(changedProductSettings);
  }

  const handleChangeSignature = (customText: string) => {
    if (changedProductSettings) {
      changedProductSettings = {
        ...changedProductSettings,
        configuration: {
          ...changedProductSettings.configuration,
          replyConfiguration: {
            ...changedProductSettings.configuration.replyConfiguration,
            signature: {
              type: 'custom',
              customText
            }
          }
        }
      } as IStore;
    }
  };

  return (
    <MainTemplate className="reviewModeration">
      <div className="d-flex justify-content-between align-items-center">
        <Link to={`../${SITE_URL.MY_STORES}`}>
          <Button variant="contained" className="btn-green py-3 px-4">
            вернуться к списку магазинов
          </Button>
        </Link>
        <Shape />
      </div>
      <hr className="mt-5 mb-5" />
      <h2 className="def-section-title mt-70">общие настройки для всех товаров Магазина</h2>
      <p className="fs-18 c-grey mt-3">
        <b>Организация:</b> {store?.title}
      </p>
      <div className="row">
        <div className="col-6 mb-5">
          <div className="wrapper">
            <div className="d-flex justify-content-between align-items-center">
              <Select
                className="w-75 select-project-settings"
                selected={printValueSelect(
                  productSettings?.configuration.replyConfiguration.rates['1'].reviewStyle
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
                <DefSwitch className="ms-2" onChangeProps={changeAllReply} status={autoReplyAll} />
              </div>
              <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
                Отвечать на старые отзывы
                <DefSwitch className="ms-2" />
              </div>
            </div>
          </div>
        </div>

        {productSettings ? (
          <>
            <div className="col-6 mb-5">
              <ProjectSettingsWrapper
                item={productSettings.configuration.replyConfiguration.rates['1']}
                index={0}
                onChange={changeRate}
                title={'Включить автоответ на отзывы с рейтингом 1'}
                changeAutoReply={getChangeAutoReply}
                removeTalentItem={removeTalentItem}
              />
            </div>
            <div className="col-6 mb-5">
              <ProjectSettingsWrapper
                item={productSettings.configuration.replyConfiguration.rates['2']}
                index={1}
                onChange={changeRate}
                title={'Включить автоответ на отзывы с рейтингом 2'}
                changeAutoReply={getChangeAutoReply}
                removeTalentItem={removeTalentItem}
              />
            </div>
            <div className="col-6 mb-5">
              <ProjectSettingsWrapper
                item={productSettings.configuration.replyConfiguration.rates['3']}
                index={2}
                onChange={changeRate}
                title={'Включить автоответ на отзывы с рейтингом 3'}
                changeAutoReply={getChangeAutoReply}
                removeTalentItem={removeTalentItem}
              />
            </div>
            <div className="col-6 mb-5">
              <ProjectSettingsWrapper
                item={productSettings.configuration.replyConfiguration.rates['4']}
                index={3}
                onChange={changeRate}
                title={'Включить автоответ на отзывы с рейтингом 4'}
                changeAutoReply={getChangeAutoReply}
                removeTalentItem={removeTalentItem}
              />
            </div>
            <div className="col-6 mb-5">
              <ProjectSettingsWrapper
                item={productSettings.configuration.replyConfiguration.rates['5']}
                index={4}
                onChange={changeRate}
                title={'Включить автоответ на отзывы с рейтингом 5'}
                changeAutoReply={getChangeAutoReply}
                removeTalentItem={removeTalentItem}
              />
            </div>
            <div className="col-12 mb-5">
              <div className="wrapper">
                <DefaultInputs
                  placeholder="Подпись"
                  title={<span className="c-grey fs-18 mb-2 d-block">Подпись</span>}
                  quotation={{
                    text: 'text',
                    title: 'title'
                  }}
                  onChange={(e: any) => handleChangeSignature(e.target.value)}
                  value={productSettings.configuration.replyConfiguration.signature.customText}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <CircularProgress
              size={50}
              sx={{
                color: '#4B4AEF'
              }}
              className="ms-2"
            />
          </div>
        )}

        {/*<div className="col-6 mb-5 pe-4">*/}
        {/*  <ProjectSettingsWrapper title="Включить автоответ на отзывы с рейтингом 2" />*/}
        {/*</div>*/}
        {/*<div className="col-6 mb-5 pe-4">*/}
        {/*  <ProjectSettingsWrapper title="Включить автоответ на отзывы с рейтингом 3" />*/}
        {/*</div>*/}
        {/*<div className="col-6 mb-5 pe-4">*/}
        {/*  <ProjectSettingsWrapper title="Включить автоответ на отзывы с рейтингом 4" />*/}
        {/*</div>*/}
        {/*<div className="col-6 mb-5 pe-4">*/}
        {/*  <ProjectSettingsWrapper title="Включить автоответ на отзывы с рейтингом 5" />*/}
        {/*</div>*/}
        <div className="col-12">
          <Button variant="contained" className="btn-blue py-4 px-99" onClick={saveChanges}>
            Сохранить
            {loading && (
              <CircularProgress
                size={22}
                sx={{
                  color: '#FFF'
                }}
                className="ms-2"
              />
            )}
          </Button>
        </div>
      </div>
    </MainTemplate>
  );
}

export default ProjectSettings;
