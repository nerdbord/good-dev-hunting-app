import { prisma } from '@/lib/prismaClient'

import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Email from 'next-auth/providers/email'
import Github from 'next-auth/providers/github'
import { sendMagicLinkEmail } from './backend/mailing/mailing.service'

const sendVerificationRequest = async ({
  url, // magic link
  identifier, // user email
}: {
  url: string
  identifier: string
}) => {
  try {
    await sendMagicLinkEmail(identifier, url)
  } catch (error) {
    throw new Error('Failed to send verification email.')
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    Email({
      sendVerificationRequest,

      // if deleted, throws error
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
  pages: {
    signIn: '/login',
  },
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
})
