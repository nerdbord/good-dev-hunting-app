'use server'
import { apiClient } from '@/lib/apiClient'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { findUserByEmail } from '@/backend/user/user.service'

export const fetchUserAvatar = async () => {
  const session = await getServerSession(authOptions)
  try {
    if (!session?.user.email) {
      console.error('Error: Session not found')
      return null
    }
    console.log('Fetching user avatar...')
    const user = await findUserByEmail(session.user.email)
    console.log('Fetched user avatar:', user?.avatarUrl)
    return user?.avatarUrl || null
  } catch (error) {
    console.error('Failed to fetch user avatar:', error)
    return null
  }
}
