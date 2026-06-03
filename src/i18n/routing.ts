export const locales = ['vi', 'en'] as const;
export const defaultLocale = 'en';
export const localeCookieName = 'locale';

export type Locale = (typeof locales)[number];

export function isLocale(locale: string | undefined): locale is Locale {
  return locales.some((item) => item === locale);
}
