import {
  validateEmail,
  validateOtp,
  validatePassword,
} from '../schemas/auth.schema';
import type {
  AuthSession,
  LoginPayload,
  RegisterPayload,
  RegisterSession,
  ResendOtpResponse,
  OtpVerification,
} from '../types/auth.type';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loginUser({
  email,
  password,
}: LoginPayload): Promise<AuthSession> {
  await wait(650);

  if (!validateEmail(email) || !validatePassword(password)) {
    throw new Error(
      'Please enter a valid email and a password with at least 6 characters.',
    );
  }

  return { email, token: 'node-mind-token' };
}

export async function registerUser({
  fullName,
  email,
  password,
  confirmPassword,
}: RegisterPayload): Promise<RegisterSession> {
  await wait(700);

  if (password !== confirmPassword) {
    throw new Error('Passwords must match.');
  }

  if (
    !fullName.trim() ||
    !validateEmail(email) ||
    !validatePassword(password)
  ) {
    throw new Error(
      'Please fill in all fields with a valid email and password.',
    );
  }

  return { fullName, email, token: 'node-mind-token' };
}

export async function verifyOtp(code: string): Promise<OtpVerification> {
  await wait(600);

  if (!validateOtp(code)) {
    throw new Error('Enter the 6-digit verification code sent to your email.');
  }

  return { verified: true };
}

export async function resendOtp(email: string): Promise<ResendOtpResponse> {
  await wait(500);

  if (!validateEmail(email)) {
    throw new Error(
      'Unable to resend OTP. Please go back and make sure your email is correct.',
    );
  }

  return { sentTo: email };
}
