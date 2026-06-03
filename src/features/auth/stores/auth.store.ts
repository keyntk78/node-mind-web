import { create } from 'zustand';
import type {
  AuthContext,
  AuthSession,
  AuthTokens,
  AuthUser,
  WorkspaceContext,
} from '../types/auth.type';

interface AuthState {
  accessToken: string | null;
  email: string;
  rememberMe: boolean;
  roles: string[];
  user: AuthUser | null;
  workspace: WorkspaceContext | null;
  clearAuth: () => void;
  setEmail: (email: string) => void;
  setAuth: (session: AuthSession) => void;
  setAuthContext: (context: AuthContext) => void;
  setTokens: (tokens: AuthTokens) => void;
  toggleRememberMe: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  email: '',
  rememberMe: true,
  roles: [],
  user: null,
  workspace: null,
  clearAuth: () =>
    set({
      accessToken: null,
      roles: [],
      user: null,
      workspace: null,
    }),
  setEmail: (email: string) => set({ email }),
  setAuth: (session: AuthSession) =>
    set({
      accessToken: session.accessToken,
      email: session.user.email,
      roles: session.roles ?? [],
      user: session.user,
      workspace: session.workspace,
    }),
  setAuthContext: (context: AuthContext) =>
    set({
      email: context.user.email,
      roles: context.roles ?? [],
      user: context.user,
      workspace: context.workspace,
    }),
  setTokens: (tokens: AuthTokens) =>
    set({
      accessToken: tokens.accessToken,
    }),
  toggleRememberMe: () => set((state) => ({ rememberMe: !state.rememberMe })),
}));
