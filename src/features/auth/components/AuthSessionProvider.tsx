'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser } from '../api/auth.api';
import {
  clearClientAuthCookies,
  getClientAccessToken,
  getClientRefreshToken,
  setClientAuthContextCookies,
} from '../lib/auth-cookie';
import { useAuthStore } from '../stores/auth.store';
import { refreshAuthTokens } from '@/shared/lib/axios';

const authRoutes = ['/login', '/register', '/otp', '/verify-otp'];
const publicRoutes = ['/', ...authRoutes];

function isRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

function isPublicRoute(pathname: string) {
  return publicRoutes.some((route) =>
    route === '/' ? pathname === route : isRoute(pathname, route),
  );
}

function isAuthRoute(pathname: string) {
  return authRoutes.some((route) => isRoute(pathname, route));
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const bootstrappedRef = useRef(false);

  useEffect(() => {
    if (bootstrappedRef.current) {
      return;
    }

    bootstrappedRef.current = true;

    async function bootstrapAuth() {
      const state = useAuthStore.getState();

      if (state.user && state.workspace) {
        return;
      }

      const refreshToken = getClientRefreshToken();
      const accessToken = state.accessToken ?? getClientAccessToken();

      if (!accessToken && !refreshToken) {
        if (!isPublicRoute(pathname)) {
          router.replace('/login');
        }

        return;
      }

      try {
        if (!accessToken && refreshToken) {
          await refreshAuthTokens();
        }

        const response = await getCurrentUser();
        useAuthStore.getState().setAuthContext(response.data);
        setClientAuthContextCookies(response.data);

        if (isAuthRoute(pathname) || pathname === '/') {
          router.replace(`/${response.data.workspace.slug}`);
        }
      } catch {
        useAuthStore.getState().clearAuth();
        clearClientAuthCookies();

        if (!isPublicRoute(pathname)) {
          router.replace('/login');
        }
      }
    }

    void bootstrapAuth();
  }, [pathname, router]);

  return children;
}
