import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Verificamos si hay una sesión activa
  const { data: { session } } = await supabase.auth.getSession()

  // Si intenta entrar a /admin y no está logueado, lo mandamos al login de Supabase o a la Home
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'], // Solo protege la ruta admin y sus subrutas
}