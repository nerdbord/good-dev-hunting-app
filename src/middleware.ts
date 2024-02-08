import { NextResponse } from 'next/server'

export function middleware(req: Request) {
  const USERNAME = process.env.BASIC_AUTH_USERNAME
  const PASSWORD = process.env.BASIC_AUTH_PASSWORD

  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === USERNAME && pwd === PASSWORD) {
      return NextResponse.next()
    }
  } else {
    // Construct a response for the unauthorized request
    const response = new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })

    return response
  }
}
