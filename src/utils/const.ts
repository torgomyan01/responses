import DropDownWb from '../assets/images/DropDownWb.svg';
import DropDownOz from '../assets/images/DropDownOz.svg';
import DropDownYm from '../assets/images/DropDownYm.png';

export const SITE_URL = {
  HOME: '/',
  CREATE_PROJECT: '/profile-settings',
  PROJECT_SETTINGS: '/project-settings/:storeId'
};

export const STATUS_BUTTON = {
  CLOSED: 'closed',
  SUCCESS: 'success'
};

export const API_URLS = {
  GET_STORES: '/user/stores',
  GET_STORE: (id: string) => `/user/stores/${id}/configuration/response`
};

export const STORES_MARKETPLACE = [
  {
    name: 'WB',
    image: DropDownWb
  },
  {
    name: 'OZ',
    image: DropDownOz
  },
  {
    name: 'YM ',
    image: DropDownYm
  }
];
