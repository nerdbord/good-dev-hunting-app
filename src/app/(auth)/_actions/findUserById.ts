'use server'
import { UserModel } from '@/app/(auth)/_models/User.model'
import { findUserById as findOne } from '@/backend/user/user.service'
import { withSentry } from '@/utils/errHandling'

export const findUserById = withSentry(async (id: string) => {
  const foundUser = await findOne(id)

  if (!foundUser) {
    throw new Error('User not found')
  }

  return new UserModel(foundUser)
})
