import { registerNewUser } from '@/app/(auth)/_actions/registerNewUser'
import { syncGithubCredentialsWithUser } from '@/backend/user/user.service'
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
        token && token.email && token.name
          ? await syncGithubCredentialsWithUser({
              username: token.name,
              email: token.email,
            })
          : null

      if (!foundUser) {
        return null
      }

      return { ...token, ...user }
    },
    async signIn({ user, profile: githubDetails }): Promise<boolean> {
      const castedUser = user as UserAuthed
      const castedGithubDetails = githubDetails as GitHubProfileAuthed

      if (user && githubDetails) {
        const foundUser = await syncGithubCredentialsWithUser({
          username: castedUser.name,
          email: castedUser.email,
        })

        if (foundUser) {
          return true
        }

        const createdUser = await registerNewUser({
          email: castedUser.email,
          name: castedUser.name,
          image: castedGithubDetails.avatar_url,
          githubUsername: castedGithubDetails.login,
        })

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

  if (!session?.user?.email) {
    throw Error('Unauthorized')
  }

  return { email: session.user.email }
}
