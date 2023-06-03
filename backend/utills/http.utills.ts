import { NextApiRequest, NextApiResponse } from 'next'
import { allPublishedProfilesPayload } from '../profile/profile.service'

export async function allRequestController(
  req: NextApiRequest,
  callbackFn: () => Promise<void>,
) {
  switch (req.method) {
    case 'GET':
      return callbackFn()
    case 'POST':
      return callbackFn()
    default:
      throw new Error('Unsupported HTTP method')
  }
}

export async function getRequestController(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const publishedProfiles = await allPublishedProfilesPayload()

    res.status(200).json({
      message: 'Success',
      profiles: publishedProfiles,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
