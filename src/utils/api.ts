import axios from 'axios';
import { API_URLS } from './const';
import { changeUserAuth, GetUserAuth } from './helpers';

const API_URL = process.env.REACT_APP_API_URL;

//Without this cookies does not send
axios.defaults.withCredentials = true;

axios.interceptors.request.use(async function (conf) {
  if (GetUserAuth()) {
    const response = await fetch(`${API_URL}${API_URLS.USER_STATUS}`);
    if (response.status === 401) {
      window.location.replace('/');
      changeUserAuth('0');
    }
  }

  return conf;
});

export const CreateUser = (data: { username: string; password: string }) =>
  axios.post(`${API_URL}${API_URLS.USER_PROFILE}`, data);

export const UserLogin = (data: { username: string; password: string }) =>
  axios.post(`${API_URL}${API_URLS.USER_LOGIN}`, data);

export const UserLogout = () => axios.get(`${API_URL}${API_URLS.USER_LOGOUT}`);

// STORES API
export const GetUserStores = (limit: number, startFrom: number, statistics: boolean = false) =>
  axios.get(
    `${API_URL}${API_URLS.STORES}${
      statistics ? '/statistics' : ''
    }?limit=${limit}&startFrom=${startFrom}`
  );

export const DeleteUserStores = (id: number | undefined) =>
  axios.delete(`${API_URL}${API_URLS.STORES}/${id}`);

export const GetStoreInfo = (id: number) => axios.get(`${API_URL}${API_URLS.GET_STORE(id)}`);
export const SaveStoreInfo = (id: number, data: any) =>
  axios.put(`${API_URL}${API_URLS.GET_STORE(id)}`, data);

export const GetFeedbacksResponse = (
  id: number | undefined,
  limit: number | string,
  startFrom: number
) =>
  axios.get(`${API_URL}${API_URLS.FEEDBACKS_RESPONSE(id)}?limit=${limit}&startFrom=${startFrom}`);

export const GetProductsStatistics = (id: number, limit: number | string, startFrom: number) =>
  axios.get(`${API_URL}${API_URLS.PRODUCTS_STATISTICS(id)}?limit=${limit}&startFrom=${startFrom}`);

// export const GenerateNewResponseRenew = (id: number) =>
//   axios.get(`${API_URL}${API_URLS.GET_RESPONSE_RENEW(id)}`);

export const RenewResponse = (storeId: number, feedbackId: number, responseId: number) =>
  axios.get(`${API_URL}${API_URLS.RENEW_FEEDBACK_RESPONSE(storeId, feedbackId, responseId)}`);

export default (
  storeId: number,
  feedbackId: number,
  responseId: number,
  manualResponseText: string | null
) =>
  axios.post(`${API_URL}${API_URLS.APPROVE_FEEDBACKS_RESPONSE(storeId, feedbackId, responseId)}`, {
    manualResponseText
  });

export const CreateStore = (data: IStores) => axios.post(`${API_URL}${API_URLS.STORES}`, data);
