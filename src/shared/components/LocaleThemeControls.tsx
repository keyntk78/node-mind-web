'use client';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  defaultLocale,
  localeCookieName,
  locales,
  type Locale,
} from '@/i18n/routing';
import { Languages, Moon, Sun } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useSyncExternalStore } from 'react';

const localeLabels: Record<Locale, 'vietnamese' | 'english'> = {
  vi: 'vietnamese',
  en: 'english',
};

const subscribeToHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;

export function LocaleThemeControls() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('common');
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerSnapshot,
  );

  const currentLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  const isDark = mounted && resolvedTheme === 'dark';

  const handleLocaleChange = async (nextLocale: Locale) => {
    localStorage.setItem(localeCookieName, nextLocale);
    await fetch('/api/preferences/locale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locale: nextLocale }),
    });
    router.refresh();
  };

  return (
    <div className="flex shrink-0 items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label={t('language')}
              title={t('language')}
            />
          }
        >
          <Languages />
          <span className="hidden sm:inline">
            {currentLocale.toUpperCase()}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          {locales.map((item) => (
            <DropdownMenuItem
              key={item}
              onClick={() => handleLocaleChange(item)}
              className="justify-between"
            >
              <span>{t(localeLabels[item])}</span>
              {currentLocale === item ? (
                <span>{item.toUpperCase()}</span>
              ) : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={t('theme')}
        title={isDark ? t('light') : t('dark')}
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        {isDark ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
