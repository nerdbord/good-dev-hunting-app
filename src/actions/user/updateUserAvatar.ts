'use server'
import { updateUserAvatar } from '@/backend/user/user.service'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const serverUpdateUserAvatar = async (avatarUrl: string) => {
  const session = await getServerSession(authOptions)

  if (!session?.user.email) {
    console.error('Error: Session not found')
    return null
  }

  try {
    const updatedUser = await updateUserAvatar(session.user.email, avatarUrl)
    console.log('Updated user avatar:', updatedUser.avatarUrl)
    return updatedUser.avatarUrl
  } catch (error) {
    console.error('Failed to update user avatar:', error)
    return null
  }
}
