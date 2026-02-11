import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Por ahora, solo registramos en la terminal que el middleware vive
  console.log("Middleware activo en:", request.nextUrl.pathname);
  return NextResponse.next()
}

// El matcher controla en qué páginas se mete el middleware
export const config = {
  matcher: ['/admin/:path*'],
}