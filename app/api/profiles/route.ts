import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { getPublishedProfilesPayload } from '../../../backend/profile/profile.service'

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const profiles = await getPublishedProfilesPayload()

    return NextResponse.json({
      message: 'succes',
      profile: profiles,
    })
  } catch (error) {
    return new Response('Something went wrong')
  }
}

export async function POST(request: NextApiRequest) {
  console.log('Post router ok')

  return NextResponse.json({ message: 'ok' })
}
