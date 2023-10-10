import DropDownWb from '../assets/images/DropDownWb.svg';
import DropDownOz from '../assets/images/DropDownOz.svg';
import DropDownYm from '../assets/images/DropDownYm.png';

export const SITE_URL = {
  HOME: '/',
  FEEDBACKS: '/feedbacks',
  LOGIN: '/login',
  PROFILE_SETTINGS: '/user/profile',
  STORE_SETTINGS: '/store/settings',
  CREATE_MARKETPLACE: '/stores/new',
  MY_STORES: '/stores',
  STORE_PRODUCTS: '/store-products',
  SETTINGS_EXPANDED: '/settings-expanded'
};

export const STATUS_BUTTON = {
  CLOSED: 'closed',
  SUCCESS: 'success'
};

export const API_URLS = {
  USER_LOGIN: '/user/login',
  USER_LOGOUT: '/user/logout',
  USER_STATUS: '/user/status',
  STORES: '/user/stores',
  USER_PROFILE: '/user/profile',
  GET_RESPONSE_RENEW: (responseId: number | string) => `/user/responses/${responseId}/renew`,
  GET_STORE: (id: number) => `/user/stores/${id}/configuration/response`,
  FEEDBACKS_RESPONSE: (id: number | undefined) => `/user/stores/${id}/feedbacks-response`,
  RENEW_FEEDBACK_RESPONSE: (storeId: number, feedbackId: number, responseId: number) =>
    `/user/stores/${storeId}/feedbacks-response/${feedbackId}/responses/${responseId}/renew`,
  APPROVE_FEEDBACKS_RESPONSE: (storeId: number, feedbackId: number, responseId: number) =>
    `/user/stores/${storeId}/feedbacks-response/${feedbackId}/responses/${responseId}/approve`
};

export const STORES_MARKETPLACE = [
  {
    name: 'Ozon',
    image: DropDownOz
  },
  {
    name: 'YM',
    image: DropDownYm
  },
  {
    name: 'WB',
    image: DropDownWb
  }
];

export const DEF_INPUT = {
  value: '',
  error: false
};

export const LocalStorageKeys = {
  userAuth: 'userAuthSuccess'
};
