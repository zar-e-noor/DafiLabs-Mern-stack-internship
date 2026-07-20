import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all routes under /admin except /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Check for admin session/auth cookie (e.g. 'admin_token' or 'sb-access-token')
    const adminToken = request.cookies.get('admin_session')?.value;

    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};