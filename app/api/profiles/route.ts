import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { getPublishedProfilesPayload } from '../../../backend/profile/profile.service'

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const serializedProfiles = await getPublishedProfilesPayload()

    return NextResponse.json({
      message: 'Succes',
      profile: serializedProfiles,
    })
  } catch (error) {
    return new Response('Something went wrong')
  }
}

export async function POST(request: NextApiRequest) {
  return NextResponse.json({ message: 'ok' })
}
