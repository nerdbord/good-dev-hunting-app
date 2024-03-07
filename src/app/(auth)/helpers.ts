import { auth } from '@/auth'
import { findUserByEmail } from '@/backend/user/user.service'

interface UserAuthed {
  id: string
  name: string
  email: string
  image: string
}

interface GitHubProfileAuthed {
  login: string
  avatar_url: string
}

export const authorizeUser = async () => {
  const session = await auth()

  if (!session?.user?.email) {
    throw Error('Unauthorized')
  }

  return { email: session.user.email }
}
export const getAuthorizedUser = async () => {
  const session = await auth()

  const user = session?.user?.email
    ? await findUserByEmail(session.user.email)
    : null

  return { session, user }
}
