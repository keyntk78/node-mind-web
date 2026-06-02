import { NextResponse, type NextRequest } from 'next/server';

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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const workspaceSlug = request.cookies.get('workspaceSlug')?.value;

  if (!accessToken && !isPublicRoute(pathname)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (
    accessToken &&
    workspaceSlug &&
    authRoutes.some((route) => isRoute(pathname, route))
  ) {
    return NextResponse.redirect(new URL(`/${workspaceSlug}`, request.url));
  }

  if (accessToken && pathname === '/' && workspaceSlug) {
    return NextResponse.redirect(new URL(`/${workspaceSlug}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
};
