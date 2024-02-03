import { authOptions } from '@/app/(auth)/auth'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const GithubOAuth = async () => {
  const session = await getServerSession(authOptions)

  const profile = session
    ? await getProfileByUserEmail(session.user.email)
    : null

  if (!profile) {
    return redirect(AppRoutes.createProfile)
  }

  redirect(AppRoutes.profiles)
}

export default GithubOAuth
