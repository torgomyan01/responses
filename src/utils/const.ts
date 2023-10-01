import DropDownWb from '../assets/images/DropDownWb.svg';
import DropDownOz from '../assets/images/DropDownOz.svg';
import DropDownYm from '../assets/images/DropDownYm.png';

export const SITE_URL = {
  HOME: '/',
  SETTINGS_REVIEWS: '/settings-reviews',
  PROFILE_SETTINGS: '/profile-settings',
  PROJECT_SETTINGS: '/project-settings',
  CREATE_MARKETPLACE: '/create-marketplace',
  MY_STORE: '/my-stores',
  STORE_PRODUCTS: '/store-products'
};

export const STATUS_BUTTON = {
  CLOSED: 'closed',
  SUCCESS: 'success'
};

export const API_URLS = {
  STORES: '/user/stores',
  USER_PROFILE: '/user/profile',
  GET_STORE: (id: string) => `/user/stores/${id}/configuration/response`
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
