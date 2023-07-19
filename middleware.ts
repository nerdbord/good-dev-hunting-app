import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process?.env?.NEXTAUTH_SECRET,
    cookieName: 'next-auth.session-token',
  })

  console.log('Token middleware:', token)

  // redirect user without access to login
  if (token?.token) {
    return NextResponse.redirect('/login')
  }

  //role auth

  // if (!token?.isAdmin) {
  //   return NextResponse.json('unauth')
  // }

  return NextResponse.next()
}
