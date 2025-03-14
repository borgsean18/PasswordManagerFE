import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the path of the request
  const path = request.nextUrl.pathname;
  
  // Define paths that require authentication
  const protectedPaths = ['/dashboard'];
  
  // Define paths that are accessible only to non-authenticated users
  const authPaths = ['/login', '/register'];
  
  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(pp => path.startsWith(pp));
  
  // Check if the path is for non-authenticated users
  const isAuthPath = authPaths.some(ap => path.startsWith(ap));
  
  // Get the token from cookies
  const token = request.cookies.get('authToken')?.value;
  
  // If the path requires authentication and there's no token, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If the path is for non-authenticated users and there's a token, redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Apply to all paths except for static files, api routes, and _next
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 