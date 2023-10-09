import React, { useEffect, useState } from 'react';
import './project-settings.css';
import MainTemplate from '../../features/main-template/main-template';
import { Button, CircularProgress } from '@mui/material';
import Shape from '../../features/shape/shape';
import SortingSelect from '../../features/sorting-select/sorting-select';
import Interrogative from '../../features/Interrogative/Interrogative';
import DefSwitch from '../../features/switch/switch';
import ProjectSettingsWrapper from './components/project-settings-wrapper';
import { GetStoreInfo, SaveStoreInfo } from '../../utils/api';
import { changeProductSettings, RandomKey } from '../../utils/helpers';
import Select from '../../features/select/select';
import { useDispatch, useSelector } from 'react-redux';
import { setInfoStore } from '../../redux/project-settings';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { AlertSiteTypes } from '../../enums/enums';

const sortArray = [
  'Сначала новые',
  'Сначала старые',
  'Сначала отправленные',
  'Сначала неотправленные',
  'Рейтинг по возрастанию',
  'Рейтинг по убыванию',
  'Группировка по товару'
];

const selectItems = ['friendly', 'formal'];

let changedProductSettings: IStore | null = null;

function ProjectSettings() {
  const dispatch = useDispatch();
  const activeStore = useSelector((state: IUserInfo) => state.UserInfo.activeStore);
  const [productSettings, setProductSettings] = useState<IStore | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (activeStore && activeStore.storeId) {
      setProductSettings(null);
      changedProductSettings = null;
      GetStoreInfo(activeStore.storeId).then(({ data }) => {
        dispatch(setInfoStore(data));
        setProductSettings(data);
        changedProductSettings = data;
      });
    }
  }, [activeStore]);

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
    Array.from({ length: 5 }).forEach((item, index) => {
      changeProductSettings('reviewStyle', changedProductSettings, index + 1, value, (result) => {
        changedProductSettings = result;
      });
    });
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
    if (activeStore && activeStore.storeId) {
      setLoading(true);
      SaveStoreInfo(activeStore.storeId, changedProductSettings)
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
        });
    }
  }

  return (
    <MainTemplate className="reviewModeration">
      <div className="d-flex justify-content-between align-items-center">
        <Button variant="contained" className="btn-green py-3 px-4">
          вернуться к списку товаров
        </Button>
        <Shape />
      </div>
      <hr className="mt-5 mb-5" />
      <div className="filter-block">
        <div className="d-flex justify-content-start align-items-center">
          <label className="def-search me-5">
            <i className="fa-solid fa-magnifying-glass" />
            <input type="text" placeholder="Найти товар" />
          </label>
          <SortingSelect items={sortArray} />
        </div>
      </div>
      <h2 className="def-section-title mt-70">общие настройки для всех товаров Магазина</h2>
      <p className="fs-18 c-grey mt-3">
        <b>Организация:</b> ИП Шишкова О.П.
      </p>
      <div className="row">
        <div className="col-6 mb-5">
          <div className="wrapper">
            <div className="d-flex justify-content-between align-items-center">
              <Select
                className="w-75 select-project-settings"
                selected={productSettings?.configuration.replyConfiguration.rates['1'].reviewStyle}
                items={selectItems}
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
                <DefSwitch className="ms-2" />
              </div>
              <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
                Отвечать на старые отзывы
                <DefSwitch className="ms-2" />
              </div>
            </div>
          </div>
        </div>

        {productSettings ? (
          Object.values(productSettings.configuration.replyConfiguration.rates)?.map(
            (el, index) => (
              <div key={RandomKey()} className="col-6 mb-5">
                <ProjectSettingsWrapper
                  item={el}
                  index={index}
                  onChange={changeRate}
                  title={`Включить автоответ на отзывы с рейтингом  ${index + 1}`}
                  changeAutoReply={getChangeAutoReply}
                  removeTalentItem={removeTalentItem}
                />
              </div>
            )
          )
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
