import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { authOptions } from '@/lib/auth'
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

  redirect(AppRoutes.home)
}

export default GithubOAuth
