import { create } from 'zustand';

interface AuthState {
  email: string;
  rememberMe: boolean;
  setEmail: (email: string) => void;
  toggleRememberMe: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  rememberMe: true,
  setEmail: (email: string) => set({ email }),
  toggleRememberMe: () => set((state) => ({ rememberMe: !state.rememberMe })),
}));
