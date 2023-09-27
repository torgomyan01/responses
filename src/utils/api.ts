import axios from 'axios';
import { API_URLS } from './const';

const API_URL = process.env.REACT_APP_API_URL;

export const GetUserStores = () => axios.get(`${API_URL}${API_URLS.GET_STORES}`);

export const GetStoreInfo = (id: string) => axios.get(`${API_URL}${API_URLS.GET_STORE(id)}`);
