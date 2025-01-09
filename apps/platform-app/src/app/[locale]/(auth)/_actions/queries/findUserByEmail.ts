'use server'
import { createUserModel } from '@/app/[locale]/(auth)/_models/User.model'
import { findUserByEmail as findOne } from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findUserByEmail = cache(
  withSentry(async (email: string) => {
    const foundUser = await findOne(email)

    if (!foundUser) {
      return null
    }

    return createUserModel(foundUser)
  }),
)
