import type { ReactNode } from 'react';
import { AuthSessionProvider } from '@/features/auth/components/AuthSessionProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryProvider } from './QueryProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export async function AppProvider({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <QueryProvider>
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </QueryProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
