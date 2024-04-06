import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { findUserByEmail } from '@/backend/user/user.service'
import { AppRoutes } from '@/utils/routes'
import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'
import { auth } from '../../../auth'

const GithubOAuth = async () => {
  const session = await auth()
  if (!session) redirect(AppRoutes.signIn)

  const foundUser = await findUserByEmail(session.user.email)
  if (!foundUser) redirect(AppRoutes.signIn)

  const userIsHunter = foundUser.roles.includes(Role.HUNTER)
  const profile = await getProfileByUserEmail(session.user.email)
  if (!profile && !userIsHunter) redirect(AppRoutes.createProfile)

  redirect(AppRoutes.profilesList)
}

export default GithubOAuth
