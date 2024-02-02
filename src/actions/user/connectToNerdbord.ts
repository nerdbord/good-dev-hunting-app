'use server'

import {
  findUserByEmail,
  getGitHubDetails,
  updateUserNerdbordId,
} from '@/backend/user/user.service'
import { authOptions } from '@/lib/auth'
import * as Sentry from '@sentry/nextjs'
import { getServerSession } from 'next-auth'

export interface UserData {
  id: string
  username: string
  avatarUrl: string
  githubUsername: string
  bio: string
}

interface NerdbordUser {
  user: UserData | null
}

export const connectToNerdbord = async () => {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user.email) {
      throw new Error('User not found')
    }

    const user = await findUserByEmail(session.user.email)

    if (!user) {
      throw new Error('User not found')
    }

    const userGitHubDetails = await getGitHubDetails(user?.id)

    if (!userGitHubDetails) {
      throw new Error('User not found')
    }

    const resp = await fetch(
      `https://core.nerdbord.io/v1/users/${userGitHubDetails.username}`,
    )

    if (!resp.ok) {
      throw new Error('Something went wrong!')
    }

    const data: NerdbordUser = await resp.json()

    if (!data.user) {
      throw new Error('Nerdbord user not found')
    }

    await updateUserNerdbordId(user.id, data.user.id)
  } catch (err) {
    Sentry.captureException(err)
    throw err
  }
}
