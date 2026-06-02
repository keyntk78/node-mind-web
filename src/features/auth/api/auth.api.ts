import { apiConfig } from '@/shared/lib/axios';
import type {
  ApiResponse,
  AuthSession,
  LoginPayload,
  OtpPayload,
  RegisterPayload,
  RegisterResponse,
  ResendOtpPayload,
  ResendOtpResponse,
} from '../types/auth.type';

async function requestAuth<TData>(
  path: string,
  body: unknown,
): Promise<ApiResponse<TData>> {
  const response = await fetch(`${apiConfig.authBaseURL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiResponse<TData>
    | { message?: string; error?: string; code?: string }
    | null;

  if (!response.ok) {
    const errorPayload = payload as {
      message?: string;
      error?: string;
      code?: string;
    } | null;
    const message =
      errorPayload?.message ||
      errorPayload?.error ||
      errorPayload?.code ||
      `Request failed with status ${response.status}.`;

    throw new Error(message);
  }

  if (!payload || !('data' in payload)) {
    throw new Error('API response is missing data.');
  }

  return payload;
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
