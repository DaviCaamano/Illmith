import { isProd, isServer, PORT, prodUrl } from '@constants/shared';
import axios, { AxiosRequestConfig } from 'axios';

export enum httpMethod {
  connect = 'CONNECT',
  CONNECT = 'CONNECT',
  delete = 'DELETE',
  DELETE = 'DELETE',
  get = 'GET',
  GET = 'GET',
  head = 'HEAD',
  HEAD = 'HEAD',
  options = 'OPTIONS',
  OPTIONS = 'OPTIONS',
  patch = 'PATCH',
  PATCH = 'PATCH',
  post = 'POST',
  POST = 'POST',
  put = 'PUT',
  PUT = 'PUT',
  trace = 'TRACE',
  TRACE = 'TRACE',
}

const fetcher = (url: string, config?: AxiosRequestConfig) => {
  let fetchUrl: string;
  if (isServer) {
    if (isProd) {
      fetchUrl = url.startsWith('/') ? `${prodUrl}${PORT}${url}` : url;
    } else {
      fetchUrl = url.startsWith('/') ? `http://localhost:${PORT}${url}` : url;
    }
  } else {
    fetchUrl = url;
  }

  if (config && !config.method) {
    config.method = httpMethod.GET;
  }
  return axios(fetchUrl, config).then((res) => res.data);
};
export { fetcher };
