import { create } from 'zustand';
import type { AuthSession } from '../types/auth.type';

interface AuthState {
  email: string;
  rememberMe: boolean;
  session: AuthSession | null;
  setEmail: (email: string) => void;
  setSession: (session: AuthSession) => void;
  toggleRememberMe: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  rememberMe: true,
  session: null,
  setEmail: (email: string) => set({ email }),
  setSession: (session: AuthSession) =>
    set({ email: session.user.email, session }),
  toggleRememberMe: () => set((state) => ({ rememberMe: !state.rememberMe })),
}));
