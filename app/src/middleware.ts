import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

// Middleware to protect admin routes
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public files
  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }
  
  // Allow access to public pages
  if (pathname === '/' || pathname === '/blog' || pathname === '/contact' || pathname === '/about') {
    return NextResponse.next();
  }
  
  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Check for admin token in cookies or localStorage
    const token = request.cookies.get('admin_token');
    
    if (!token) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // TODO: Validate token with your backend
    // const isValid = await validateToken(token.value);
    // if (!isValid) {
    //   const loginUrl = new URL('/admin/login', request.url);
    //   return NextResponse.redirect(loginUrl);
    // }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};