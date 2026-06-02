import type { z } from 'zod';
import type {
  loginSchema,
  otpSchema,
  registerSchema,
  resendOtpSchema,
} from '../schemas/auth.schema';

export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterPayload = z.infer<typeof registerSchema>;
export type OtpPayload = z.infer<typeof otpSchema>;
export type ResendOtpPayload = z.infer<typeof resendOtpSchema>;

export type ApiResponse<TData> = {
  message: string;
  data: TData;
};

export type AuthUser = {
  id: string;
  email: string;
  isVerified: boolean;
  mfaEnabled?: boolean;
};

export type WorkspaceContext = {
  id: string;
  name: string;
  slug: string;
  membership: string;
};

export type RegisterResponse = {
  userId: string;
  email: string;
  isVerified: boolean;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer' | string;
  expiresIn: number;
};

export type AuthSession = AuthTokens & {
  user: AuthUser;
  workspace: WorkspaceContext;
  roles?: string[];
};

export type ResendOtpResponse = {
  email: string;
  expiresIn: number;
};

export type LogoutResponse = {
  loggedOut: boolean;
};
