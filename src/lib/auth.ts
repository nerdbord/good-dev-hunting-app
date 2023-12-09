import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { getServerSession } from 'next-auth'
import { createUser, findUserByEmail } from '@/backend/user/user.service'
import { mailersendClient } from './mailersendClient'

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
      const foundUser = token.email ? await findUserByEmail(token.email) : null

      if (!foundUser) {
        return {
          id: null,
        }
      }

      token.id = foundUser.id

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

        if (createdUser) {
          await mailersendClient.sendMail(
            createdUser.email,
            castedProfile.login,
          )
        }

        return !!createdUser
      }

      return false
    },
    async session({ session, token }) {
      if (session?.user) {
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
