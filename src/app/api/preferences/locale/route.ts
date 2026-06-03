import { isLocale, localeCookieName } from '@/i18n/routing';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    locale?: unknown;
  } | null;
  const locale = typeof body?.locale === 'string' ? body.locale : undefined;

  if (!isLocale(locale)) {
    return Response.json({ error: 'Unsupported locale' }, { status: 400 });
  }

  const cookieStore = await cookies();

  cookieStore.set(localeCookieName, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  });

  return Response.json({ locale });
}
