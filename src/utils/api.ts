import axios from 'axios';
import { API_URLS } from './const';

const API_URL = process.env.REACT_APP_API_URL;

//Without this cookies does not send
axios.defaults.withCredentials = true;

export const setupResponseInterceptor = (navigate: any) => {
  const myInterceptor = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status == 401) {
        navigate('/login');
      } else {
        return Promise.reject(error);
      }
    }
  );

  return () => {
    axios.interceptors.response.eject(myInterceptor);
  };
};

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

export const GetUserStore = (storeId: number) =>
  axios.get(`${API_URL}${API_URLS.STORES}/${storeId}`);

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

export const ChangeStore = (
  data: {
    storeId: number;
    storeType: string;
    title: string;
    apiToken: string;
  },
  id: string | number
) => axios.put(`${API_URL}${API_URLS.STORES}/${id}`, data);
