import { NextApiRequest, NextApiResponse } from 'next'
import { allPublishedProfiles } from './profilesRouteMethods.services'

export default async function requestHandler(
  method: string,
  callbackFn: () => void,
) {
  switch (method) {
    case 'GET':
      return callbackFn()
    case 'POST':
      return callbackFn()
    default:
      throw new Error('Unsupported HTTP method')
  }
}

export async function handleGetRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const publishedProfiles = await allPublishedProfiles()

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
