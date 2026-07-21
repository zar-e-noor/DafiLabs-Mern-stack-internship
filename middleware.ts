import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') ) {
    const adminToken = request.cookies.get('admin_session')?.value;
  
    if (!adminToken) {
      const loginUrl = new URL('/login', request.url);  // ✅ was '/admin/login'
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};