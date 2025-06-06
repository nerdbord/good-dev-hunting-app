﻿'use server'

import { createUserModel } from '@/app/[locale]/(auth)/_models/User.model'
import { updateUserNerdbordId } from '@/backend/user/user.service'
import { type NerdbordUser } from '@/lib/nerdbord/types'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'

export const connectToNerdbord = withSentry(async () => {
  const { user } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')
  if (!user.githubUsername) throw new Error('Github Username not found')

  const resp = await fetch(
    `https://core.nerdbord.io/v1/users/${user.githubUsername}`,
  )

  if (!resp.ok) {
    throw new Error('Something went wrong!')
  }

  const data: NerdbordUser = await resp.json()

  if (!data.user) {
    throw new Error('Nerdbord user not found')
  }

  const updatedUser = await updateUserNerdbordId(user.id, data.user.id)

  return createUserModel(updatedUser)
})
