'use server'

import {
  getGitHubDetails,
  updateUserNerdbordId,
} from '@/backend/user/user.service'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export interface NerdbordDetails {
  id: string
  username: string
  avatarUrl: string
  githubUsername: string
  bio: string
}

export const connectToNerdbord = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user.email) {
    console.error('Error: Session not found')
    return null
  }

  const userGitHubDetails = await getGitHubDetails(session.user.id)

  if (!userGitHubDetails) {
    console.error('Error: User GitHub details not found')
    return null
  }

  try {
    const resp = await fetch(
      `https://core.nerdbord.io/v1/users/${userGitHubDetails.username}`,
    )

    if (!resp.ok) {
      throw new Error('Something went wrong!')
    }
    const data: NerdbordDetails = await resp.json()

    await updateUserNerdbordId(session.user.id, data.githubUsername)
  } catch (error) {
    console.log(error)
  }
}
