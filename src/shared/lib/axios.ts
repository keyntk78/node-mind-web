export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api',
  authBaseURL:
    process.env.NEXT_PUBLIC_AUTH_API_URL ?? 'http://localhost:3001/api/v1/auth',
  timeout: 10_000,
};
