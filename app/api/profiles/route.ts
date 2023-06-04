import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { getPublishedProfilesPayload } from '../../../backend/profile/profile.service'

export async function allRequestController(
  req: NextApiRequest,
  res: NextApiResponse,
  httpHandlers: {
    POST: (
      req: NextApiRequest,
      res: NextApiResponse,
    ) => Promise<NextResponse<{ message: string }>>
    GET: (
      req: NextApiRequest,
      res: NextApiResponse,
    ) => Promise<NextResponse<{ message: string }>>
  },
) {
  switch (req.method) {
    case 'GET':
      return httpHandlers.GET(req, res)
    case 'POST':
      return httpHandlers.POST(req, res)
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export const httpHandlers = {
  GET,
  POST,
}

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
