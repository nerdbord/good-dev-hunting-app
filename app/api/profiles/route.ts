import { NextApiRequest, NextApiResponse } from 'next'
import {
  handleGetRequest,
  requestHandler,
} from '../../../backend/profile/profile.controller'

export default async function routeHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await requestHandler(req.method, async () => {
    switch (req.method) {
      case 'GET':
        await handleGetRequest(req, res)
        break
      // handle other method
      default:
        throw new Error('Unsupported HTTP method')
    }
  })
}
