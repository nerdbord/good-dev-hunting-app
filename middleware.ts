import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process?.env?.NEXTAUTH_SECRET,
    cookieName: 'next-auth.session-token',
  })

  // console.log('Token middleware:', token)

  if (!token) {
    // redirect user without access to login
    // return NextResponse.redirect('http://localhost:3000')
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401 },
    )
  }

  return NextResponse.next()
}

export const config = {
  //  matcher: ['/((?!auth|login).*)'], //excludes from auth
  matcher: ['/api', '/api/profiles'],
}
