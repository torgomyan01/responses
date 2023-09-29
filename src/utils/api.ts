import axios from 'axios';
import { API_URLS } from './const';

const API_URL = process.env.REACT_APP_API_URL;

export const GetUserStores = () => axios.get(`${API_URL}${API_URLS.STORES}`);

export const DeleteUserStores = (id: number | undefined) =>
  axios.delete(`${API_URL}${API_URLS.STORES}/${id}`);

export const GetStoreInfo = (id: string) => axios.get(`${API_URL}${API_URLS.GET_STORE(id)}`);

export const CreateStore = (data: IStores) => axios.post(`${API_URL}${API_URLS.STORES}`, data);
