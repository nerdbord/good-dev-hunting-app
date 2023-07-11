import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'

export async function middleware() {
  const session = await getSession()

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  //where we should redirect?
  return NextResponse.redirect('/api/auth/signin')
}

// "Matching Paths" where middleware will be used
export const config = {
  matcher: ['/api', '/api/profiles', '/api/profiles/'],
}
