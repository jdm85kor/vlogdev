import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';;
import qs from 'qs';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://utcrpcgdq0.execute-api.ap-northeast-2.amazonaws.com/dev',
  headers: { Authorization: '' }
});

instance.interceptors.response.use(function (res) {
  res.data = camelcaseKeys(res.data, {deep: true});
  return res;
});

const apiCall = ({ method, headers, data, url, query }: {
  method: AxiosRequestConfig['method'],
  url: string,
  data?: { [key: string]: string | number },
  headers?: { [key: string]: string | number },
  query? : { [key: string]: string | number },
}) => {
  const now = new Date().getTime();
  return instance({
    method,
    headers,
    data,
    url: query ? `${url}?${qs.stringify(query)}&${now}` : `${url}?${now}`,
  });
};

export { apiCall };
