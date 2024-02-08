import { NextResponse } from 'next/server'

export function middleware(request: any) {
  const basicAuth = request.headers.get('authorization')

  const USERNAME = process.env.BASIC_AUTH_USERNAME
  const PASSWORD = process.env.BASIC_AUTH_PASSWORD

  const authString = `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString(
    'base64',
  )}`

  const isStaging = process.env.NODE_ENV === 'test'

  console.log('isStaging', isStaging)
  console.log('basicAuth', basicAuth)
  console.log('password', PASSWORD)

  if (USERNAME && PASSWORD) {
    return NextResponse.next()
  }

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
