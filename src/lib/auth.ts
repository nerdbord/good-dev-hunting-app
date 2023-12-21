import { createUser, findUserByEmail } from '@/backend/user/user.service'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
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

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const foundUser =
        token && token.email ? await findUserByEmail(token.email) : null

      if (!foundUser) {
        return null
      }

      return { ...token, ...user }
    },
    async signIn({ user, profile }): Promise<boolean> {
      const castedUser = user as UserAuthed
      const castedProfile = profile as GitHubProfileAuthed

      if (user && profile) {
        const foundUser = await findUserByEmail(castedUser.email)

        if (foundUser) {
          return true
        }

        const createdUser = await createUser({
          email: castedUser.email,
          name: castedProfile.login,
          image: castedProfile.avatar_url,
        })

        // TODO(Agnieszka): Send email to user about successful registration

        return !!createdUser
      }

      return false
    },
    async session({ session, token }) {
      if (token === null) {
        return { expires: session.expires, user: undefined }
      } else if (token && session?.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }

      return session
    },
  },
}

export const authorizeUser = async () => {
  const session = await getServerSession(authOptions)

  console.log('Session:', session)

  if (!session?.user?.email) {
    throw Error('Unauthorized')
  }

  return { email: session.user.email }
}
