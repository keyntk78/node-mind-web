import { api } from '@/shared/lib/axios';
import axios from 'axios';
import { getClientRefreshToken } from '../lib/auth-cookie';
import type {
  ApiResponse,
  AuthContext,
  AuthSession,
  LoginPayload,
  LogoutResponse,
  OtpPayload,
  RegisterPayload,
  RegisterResponse,
  ResendOtpPayload,
  ResendOtpResponse,
} from '../types/auth.type';

type ApiErrorResponse = {
  message?: string;
  error?: string;
  code?: string;
};

async function requestAuth<TData>(
  path: string,
  body: unknown,
): Promise<ApiResponse<TData>> {
  try {
    const { data } = await api.post<ApiResponse<TData>>(`v1/auth${path}`, body);

    return data;
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.code ||
        error.message;

      throw new Error(message);
    }

    throw error;
  }
}

export async function loginUser(payload: LoginPayload) {
  return requestAuth<AuthSession>('/login', payload);
}

export async function registerUser(payload: RegisterPayload) {
  return requestAuth<RegisterResponse>('/register', payload);
}

export async function verifyOtp(payload: OtpPayload) {
  return requestAuth<AuthSession>('/verify-email', payload);
}

export async function resendOtp(payload: ResendOtpPayload) {
  return requestAuth<ResendOtpResponse>('/resend-verification-otp', payload);
}

export async function getCurrentUser() {
  try {
    const { data } = await api.get<ApiResponse<AuthContext>>('v1/auth/me');

    return data;
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.code ||
        error.message;

      throw new Error(message);
    }

    throw error;
  }
}

export async function logoutUser() {
  const refreshToken = getClientRefreshToken();

  return requestAuth<LogoutResponse>('/logout', { refreshToken });
}
