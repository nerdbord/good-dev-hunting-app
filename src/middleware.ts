import { NextResponse } from 'next/server'

export function middleware(request: any) {
  const basicAuth = request.headers.get('authorization')

  const USERNAME = process.env.BASIC_AUTH_USERNAME
  const PASSWORD = process.env.BASIC_AUTH_PASSWORD

  const authString = `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString(
    'base64',
  )}`

  // const isProtected = Boolean(USERNAME && PASSWORD)
  //
  // if (!isProtected) {
  //   return NextResponse.next()
  // }

  if (basicAuth === authString) {
    // Authentication successful
    return NextResponse.next()
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
