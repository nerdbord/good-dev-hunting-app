import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { getProfilesById } from '../../../../backend/profile/profile.service'

//find id in req

export async function GET(
  request: NextApiRequest,
  response: NextApiResponse,
  data: string,
) {
  try {
    const { id } = request.query //find id

    const profilesById: ProfilePayload[] = [] //add function

    return NextResponse.json({
      message: 'succes',
      profile: profilesById,
    })
  } catch (error) {
    return new Response('Something went wrong')
  }
}

export async function POST(request: NextApiRequest) {
  return NextResponse.json({ message: 'ok' })
}
