import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import { auth } from '../../../auth'

const GithubOAuth = async () => {
  const session = await auth()

  const profile = session
    ? await getProfileByUserEmail(session.user.email)
    : null

  // update role

  if (!profile) {
    return redirect(AppRoutes.createProfile)
  }

  redirect(AppRoutes.profiles)
}

export default GithubOAuth
