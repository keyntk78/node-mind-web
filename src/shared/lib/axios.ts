export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api',
  timeout: 10_000,
};
