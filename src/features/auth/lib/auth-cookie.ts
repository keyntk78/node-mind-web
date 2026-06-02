import type { AuthSession, AuthTokens } from '../types/auth.type';

const accessTokenCookieName = 'accessToken';
const refreshTokenStorageKey = 'refreshToken';
const workspaceSlugCookieName = 'workspaceSlug';

function cookieOptions(maxAge?: number) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  const age = maxAge ? `; Max-Age=${maxAge}` : '';

  return `Path=/; SameSite=Lax${secure}${age}`;
}

export function setClientAuthCookies(session: AuthSession) {
  setClientAccessTokenCookie(session);

  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${workspaceSlugCookieName}=${encodeURIComponent(
    session.workspace.slug,
  )}; ${cookieOptions(session.expiresIn)}`;
}

export function setClientAccessTokenCookie(tokens: AuthTokens) {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${accessTokenCookieName}=${encodeURIComponent(
    tokens.accessToken,
  )}; ${cookieOptions(tokens.expiresIn)}`;

  localStorage.setItem(refreshTokenStorageKey, tokens.refreshToken);
}

export function getClientAccessToken() {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split('; ');
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith(`${accessTokenCookieName}=`),
  );

  if (!accessTokenCookie) {
    return null;
  }

  const [, value = ''] = accessTokenCookie.split('=');

  return decodeURIComponent(value);
}

export function getClientRefreshToken() {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  return localStorage.getItem(refreshTokenStorageKey);
}

export function clearClientAuthCookies() {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${accessTokenCookieName}=; ${cookieOptions(-1)}`;
  document.cookie = `${workspaceSlugCookieName}=; ${cookieOptions(-1)}`;
  localStorage.removeItem(refreshTokenStorageKey);
}
