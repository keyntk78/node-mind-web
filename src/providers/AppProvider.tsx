import type { ReactNode } from 'react';
import { AuthSessionProvider } from '@/features/auth/components/AuthSessionProvider';
import { QueryProvider } from './QueryProvider';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthSessionProvider>{children}</AuthSessionProvider>
    </QueryProvider>
  );
}
