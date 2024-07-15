import { message as Message } from 'antd';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { t } from 'i18next';

import { ResultEnum } from '@/enums';
import { useUserActions } from '@/stores/userStore';
import { Result } from '@/types';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// Intercept request for bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer Token';
    return config;
  },
  (error: Error | AxiosError) => {
    return Promise.reject(error);
  },
);

// Intercept response - can be customize further TODO: Add toast message here
axiosInstance.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    if (!res.data) {
      throw new Error(t('sys.api.apiRequestFailed'));
    }

    const { status, data, message } = res.data;
    const hasSuccess = data && Reflect.has(res.data, 'status') && status === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return data;
    }

    throw new Error(message || t('sys.api.apiRequestFailed'));
  },
  (error: AxiosError<Result>) => {
    const { response, message } = error || {};
    const userActions = useUserActions();

    const errorMessage = response?.data?.message || message || t('sys.api.errorMessage');
    Message.error(errorMessage);

    const status = response?.status;
    if (status === 401) {
      userActions.clearUserInfoAndToken();
    }
    return Promise.reject(error);
  },
);

class APIClient {
  public get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  public post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  public put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  public delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  private request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((error: Error | AxiosError) => {
          reject(error);
        });
    });
  }
}

export default new APIClient();
