import { useMutation } from '@tanstack/react-query';
import type {
  LoginPayload,
  OtpPayload,
  RegisterPayload,
  ResendOtpPayload,
} from '../types/auth.type';
import { loginUser, registerUser, resendOtp, verifyOtp } from './auth.api';

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
}

export function useVerifyOtpMutation() {
  return useMutation({
    mutationFn: (payload: OtpPayload) => verifyOtp(payload),
  });
}

export function useResendOtpMutation() {
  return useMutation({
    mutationFn: (payload: ResendOtpPayload) => resendOtp(payload),
  });
}
