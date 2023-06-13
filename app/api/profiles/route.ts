import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getPublishedProfilesPayload } from '../../../backend/profile/profile.service'

export async function GET(
  request: Request | NextRequest,
  response: NextApiResponse,
) {
  try {
    const serializedProfiles = await getPublishedProfilesPayload()

    return NextResponse.json({
      message: 'Success',
      profile: serializedProfiles,
    })
  } catch (error) {
    return new Response('Something went wrong')
  }
}

export async function POST(request: Request | NextRequest) {
  return NextResponse.json({ message: 'ok' })
}
