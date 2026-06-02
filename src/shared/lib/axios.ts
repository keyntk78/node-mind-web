import axios from 'axios';
import {
  clearClientAuthCookies,
  getClientAccessToken,
  getClientRefreshToken,
  setClientAccessTokenCookie,
} from '@/features/auth/lib/auth-cookie';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import type { ApiResponse, AuthTokens } from '@/features/auth/types/auth.type';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const accessToken =
    useAuthStore.getState().accessToken ?? getClientAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes('v1/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    const refreshToken = getClientRefreshToken();

    if (!refreshToken) {
      useAuthStore.getState().clearAuth();
      clearClientAuthCookies();

      return Promise.reject(error);
    }

    try {
      const { data } = await api.post<ApiResponse<AuthTokens>>(
        'v1/auth/refresh',
        {
          refreshToken,
        },
      );

      useAuthStore.getState().setTokens(data.data);
      setClientAccessTokenCookie(data.data);
      originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearAuth();
      clearClientAuthCookies();

      return Promise.reject(refreshError);
    }
  },
);
