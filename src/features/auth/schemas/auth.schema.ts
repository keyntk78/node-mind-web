import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must contain at least 8 characters.')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  );

export const loginSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: passwordSchema,
  deviceInfo: z.string().min(1),
});

export const registerSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: passwordSchema,
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
});

export const otpSchema = z.object({
  email: z.email('Enter a valid email address.'),
  otp: z.string().regex(/^[0-9]{6}$/, 'Enter the 6-digit verification code.'),
});

export const resendOtpSchema = z.object({
  email: z.email('Enter a valid email address.'),
});
