'use server'

import {
  findUserByEmail,
  getGitHubDetails,
  updateUserNerdbordId,
} from '@/backend/user/user.service'
import { authOptions } from '@/lib/auth'
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
  const session = await getServerSession(authOptions)
  if (!session?.user.email) {
    console.error('Error: Session not found')
    return null
  }

  const user = await findUserByEmail(session.user.email)

  if (!user) {
    console.error('Error: User not found')
    return null
  }

  const userGitHubDetails = await getGitHubDetails(user?.id)

  if (!userGitHubDetails) {
    console.error('Error: User GitHub details not found')
    return null
  }

  const resp = await fetch(
    `https://core.nerdbord.io/v1/users/${userGitHubDetails.username}`,
  )

  if (!resp.ok) {
    throw new Error('Something went wrong!')
  }

  const data: NerdbordUser = await resp.json()

  if (data.user) {
    await updateUserNerdbordId(user.id, data.user.id)
  } else {
    throw new Error(
      'User not found. Make sure your Github account is used on Nerdbord',
    )
  }
}
