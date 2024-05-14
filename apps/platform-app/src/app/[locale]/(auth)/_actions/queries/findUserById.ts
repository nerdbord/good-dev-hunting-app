'use server'
import { createUserModel } from '@/app/[locale]/(auth)/_models/User.model'
import { findUserById as findOne } from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findUserById = cache(
  withSentry(async (id: string) => {
    const foundUser = await findOne(id)

    if (!foundUser) {
      throw new Error('User not found')
    }

    return createUserModel(foundUser)
  }),
)
