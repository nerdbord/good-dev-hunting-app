'use server'

import { authorizeUser } from '@/auth'
import {
  findUserByEmail,
  getGitHubDetails,
  updateUserNerdbordId,
} from '@/backend/user/user.service'
import { NerdbordUser } from '@/lib/nerdbord/types'
import { withSentry } from '@/utils/errHandling'

export const connectToNerdbord = withSentry(async () => {
  const { email } = await authorizeUser()

  const user = await findUserByEmail(email)

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

  const updatedUser = await updateUserNerdbordId(user.id, data.user.id)

  return updatedUser
})
