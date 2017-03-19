import axios from 'axios';

const API_URL = '/api';

const instance = axios.create({
  baseURL: API_URL
});

export const addInterceptor = (type, normalHandler, errorHandler) => {
  if (type !== 'request' && type !== 'response') return console.error('Wrong interceptor type.');
  instance.interceptors[type].use(normalHandler, errorHandler);
};

const setAuthenticationHeader = (accessToken) => {
  instance.defaults.headers.common['Authorization'] = accessToken;
};

const post = (url, data) => {
  return instance.post(url, data);
};

const patch = (url, data) => {
  return instance.patch(url, data);
};

const get = (url, params) => {
  return instance.get(url, params);
};

const del = (url) => {
  return instance.delete(url);
};

export default {
  setAuthenticationHeader,
  post,
  patch,
  get,
  del
}
