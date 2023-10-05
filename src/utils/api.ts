import axios from 'axios';
import { API_URLS } from './const';

const API_URL = process.env.REACT_APP_API_URL;

export const CreateUser = (data: { username: string; password: string }) =>
  axios.post(`${API_URL}${API_URLS.USER_PROFILE}`, data);

export const UserLogin = (data: { username: string; password: string }) =>
  axios.post(`${API_URL}${API_URLS.USER_LOGIN}`, data);

// STORES API
export const GetUserStores = (limit: number, startFrom: number, statistics: boolean = false) =>
  axios.get(
    `${API_URL}${API_URLS.STORES}${
      statistics ? '/statistics' : ''
    }?limit=${limit}&startFrom=${startFrom}`
  );

export const DeleteUserStores = (id: number | undefined) =>
  axios.delete(`${API_URL}${API_URLS.STORES}/${id}`);

export const GetStoreInfo = (id: string) => axios.get(`${API_URL}${API_URLS.GET_STORE(id)}`);

export const GetFeedbacksResponse = (
  id: number | undefined,
  limit: number | string,
  startFrom: number
) =>
  axios.get(`${API_URL}${API_URLS.FEEDBACKS_RESPONSE(id)}?limit=${limit}&startFrom=${startFrom}`);

export const GenerateNewResponseRenew = (id: number) =>
  axios.get(`${API_URL}${API_URLS.GET_RESPONSE_RENEW(id)}`);

export const UpdateGenerateNewResponseRenew = (
  storeId: number,
  feedbackId: number,
  responseId: number
) => axios.get(`${API_URL}${API_URLS.UPDATE_FEEDBACKS_RESPONSE(storeId, feedbackId, responseId)}`);

export const ApproveGenerateNewResponseRenew = (
  storeId: number,
  feedbackId: number,
  responseId: number
) => axios.get(`${API_URL}${API_URLS.APPROVE_FEEDBACKS_RESPONSE(storeId, feedbackId, responseId)}`);

export const CreateStore = (data: IStores) => axios.post(`${API_URL}${API_URLS.STORES}`, data);
