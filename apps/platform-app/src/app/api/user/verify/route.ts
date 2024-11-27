import { prisma } from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Configure CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }, // Only select ID to minimize data transfer
    })

    return NextResponse.json(
      { exists: !!user },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  }
}
