import { prisma } from '@/lib/prismaClient'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { Role } from '@prisma/client'
import NextAuth from 'next-auth'
import Email from 'next-auth/providers/email'
import Github from 'next-auth/providers/github'
import { userIsHunter } from './app/(auth)/helpers'
import { sendMagicLinkEmail } from './backend/mailing/mailing.service'
import { addUserRole, findUserByEmail } from './backend/user/user.service'
import { AppRoutes } from './utils/routes'

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
    // must be named like this - otherwise throws error when route with search params
    signIn: AppRoutes.signIn,
    error: AppRoutes.error,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // WORKS for existing user with role added
      // if user exists - must login with the same provider
      if (user.email) {
        const foundUser = await findUserByEmail(user.email)

        if (foundUser && account) {
          const isHunter = userIsHunter(foundUser)
          if (
            (account.provider === 'github' && !isHunter) ||
            (account.provider === 'email' && isHunter)
          ) {
            console.log('ACCESS GRANTED')
            return true
          } else {
            console.log('ACCESS DENIED')
            return false
          }
        }
      }

      return true
    },
  },
  events: {
    signIn({ user, account, profile, isNewUser }) {
      // if user does not exist:
      // - add role SPECIALIST when loged in with github
      // - add role HUNTER when loged in with magic link
      if (!isNewUser) return

      let roleToAdd: Role = 'USER'
      if (account?.provider === 'github') {
        roleToAdd = Role.SPECIALIST
      } else if (account?.provider === 'email') {
        roleToAdd = Role.HUNTER
      }

      if (roleToAdd) {
        if (user.id) {
          addUserRole(user.id, roleToAdd)
        } else {
          console.log('NO ID FOUND')
        }
      }
    },
  },
})
