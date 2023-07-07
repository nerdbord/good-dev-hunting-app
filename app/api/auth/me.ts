import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { UserPayload } from './types'
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      profileId: string
      username: string
    }
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req })

  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const userPayload: UserPayload = {
    id: session.user.id,
    profileId: session.user.profileId,
    githubCredentials: {
      username: session.user.username,
      email: session.user.email || '',
    },
  }

  return res.status(200).json(userPayload)
}
