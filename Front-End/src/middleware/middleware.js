// src/middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth'; // Өөрийн token шалгах логик

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const verifiedToken = token && (await verifyToken(token));
  const { pathname } = request.nextUrl;

  // Patient эрхтэй хүн /patientProfile руу оролдвол шууд redirect
  if (verifiedToken?.role === 'patient' && pathname === '/patientProfile') {
    return NextResponse.redirect(new URL('/patientProfile/customerProfile/1', request.url));
  }

  // Patient эрхтэй хүн root руу оролдвол шууд redirect
  if (verifiedToken?.role === 'patient' && pathname === '/') {
    return NextResponse.redirect(new URL('/patientProfile/customerProfile/1', request.url));
  }

  // Хэрэв token байхгүй бол login руу буцаах
  if (!verifiedToken && pathname.startsWith('/patientProfile')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Бусад эрхтэй хүн patient profile хэсэгт оролдвол
  if (verifiedToken && verifiedToken.role !== 'patient' && pathname.startsWith('/patientProfile')) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};