import { NextApiRequest, NextApiResponse } from 'next'
import {
  allRequestController,
  getRequestController,
} from '../../../backend/utills/http.utills'

export default async function routeHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await allRequestController(req, async () => {
    switch (req.method) {
      case 'GET':
        await getRequestController(req, res)
        break
      // handle other method
      default:
        throw new Error('Unsupported HTTP method')
    }
  })
}
