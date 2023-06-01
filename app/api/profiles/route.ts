import { NextApiRequest, NextApiResponse } from 'next'
import {
  handleGetRequest,
  requestHandler,
} from '../../../backend/profile/profile.controller'

export default async function routeHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  requestHandler('GET', () => handleGetRequest(req, res))
}
