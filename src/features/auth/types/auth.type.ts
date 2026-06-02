export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthSession = {
  email: string;
  token: string;
};

export type RegisterSession = AuthSession & {
  fullName: string;
};

export type OtpVerification = {
  verified: boolean;
};

export type ResendOtpResponse = {
  sentTo: string;
};
