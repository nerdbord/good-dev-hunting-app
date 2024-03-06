import { findUserByEmail } from '@/backend/user/user.service'
import { prisma } from '@/lib/prismaClient'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
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
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     const foundUser =
  //       token && token.email && token.name
  //         ? await findUserByEmail(token.email)
  //         : null

  //     if (!foundUser) {
  //       return null
  //     }

  //     return { ...token, ...user }
  //   },
  //   async signIn({ user, profile: githubDetails }): Promise<boolean> {
  //     const castedUser = user as UserAuthed
  //     const castedGithubDetails = githubDetails as GitHubProfileAuthed

  //     if (user && githubDetails) {
  //       const foundUser = await syncUserWithGithub({
  //         username: castedGithubDetails.login,
  //         email: castedUser.email,
  //       })

  //       if (foundUser) {
  //         return true
  //       }

  //       const createdUser = await registerNewUser({
  //         email: castedUser.email,
  //         name: castedUser.name,
  //         image: castedGithubDetails.avatar_url,
  //         githubUsername: castedGithubDetails.login,
  //       })

  //       return !!createdUser
  //     }

  //     return false
  //   },
  //   async session({ session, token }) {
  //     if (token === null) {
  //       return { expires: session.expires, user: undefined }
  //     } else if (token && session?.user) {
  //       session.user.id = token.id as string
  //       session.user.email = token.email as string
  //     }

  //     return session
  //   },
  // },
}

export const authorizeUser = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw Error('Unauthorized')
  }

  return { email: session.user.email }
}

export const getAuthorizedUser = async () => {
  const session = await getServerSession(authOptions)

  const user = session?.user?.email
    ? await findUserByEmail(session.user.email)
    : null

  return { session, user }
}
