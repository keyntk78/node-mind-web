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

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshPromise: Promise<AuthTokens> | null = null;

export async function refreshAuthTokens() {
  const refreshToken = getClientRefreshToken();

  if (!refreshToken) {
    throw new Error('Missing refresh token');
  }

  refreshPromise ??= authApi
    .post<ApiResponse<AuthTokens>>('v1/auth/refresh', {
      refreshToken,
    })
    .then(({ data }) => {
      useAuthStore.getState().setTokens(data.data);
      setClientAccessTokenCookie(data.data);

      return data.data;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

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
    try {
      const tokens = await refreshAuthTokens();
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearAuth();
      clearClientAuthCookies();

      return Promise.reject(refreshError);
    }
  },
);
