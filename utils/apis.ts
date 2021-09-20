import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';;

const instance: AxiosInstance = axios.create({
  baseURL: 'https://utcrpcgdq0.execute-api.ap-northeast-2.amazonaws.com/dev',
  headers: { Authorization: '' }
});

instance.interceptors.response.use(function (res) {
  res.data = camelcaseKeys(res.data, {deep: true});
  return res;
});

const apiCall = ({ method, headers, data, url }: {
  method: AxiosRequestConfig['method'],
  url: string,
  data?: { [key: string]: string | number; },
  headers?: { [key: string]: string | number; },
}) => {
  return instance({
    method,
    headers,
    data,
    url,
  });
};

export { apiCall };