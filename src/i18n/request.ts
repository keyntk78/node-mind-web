import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { defaultLocale, isLocale, localeCookieName } from './routing';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  const preferredLocale = cookieStore.get(localeCookieName)?.value;
  const locale = isLocale(preferredLocale) ? preferredLocale : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
