import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

const GithubOAuth = async () => {
  const { user, userIsHunter, userHasProfile } = await getAuthorizedUser()

  if (!user) redirect(AppRoutes.signIn)

  if (!userHasProfile && !userIsHunter) redirect(AppRoutes.createProfile)

  redirect(AppRoutes.profilesList)
}

export default GithubOAuth
