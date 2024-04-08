import { prisma } from '@/lib/prismaClient'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { Role } from '@prisma/client'
import NextAuth from 'next-auth'
import Email from 'next-auth/providers/email'
import Github from 'next-auth/providers/github'
import { registerNewUser } from './app/(auth)/_actions/registerNewUser'
import { userHasRole } from './app/(auth)/helpers'
import { sendMagicLinkEmail } from './backend/mailing/mailing.service'
import {
  addUserRole,
  createGithubDetails,
  findUserByEmail,
} from './backend/user/user.service'
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
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: registerNewUser,
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      allowDangerousEmailAccountLinking: true,
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
    async jwt({ token, user, trigger }) {
      console.log(token)
      return { ...token, ...user }
    },
    async session({ session, token, user, trigger }) {
      const foundUser =
        token && token.email ? await findUserByEmail(token.email) : null

      if (!foundUser) {
        return session
      }

      session.user.id = foundUser.id
      session.user.name = foundUser.profile?.fullName || ''
      session.user.image = (
        foundUser.avatarUrl ? foundUser.avatarUrl : foundUser.image
      ) as string
      session.user.roles = foundUser.roles
      session.user.profileId = foundUser.profile && foundUser.profile.id
      session.user.githubUsername =
        foundUser.githubDetails && foundUser.githubDetails.username

      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      // WORKS for existing user with role added
      // if user exists - must login with the same provider

      if (!user.email) {
        throw new Error('Email not provided for sign-in.')
      }
      const foundUser = await findUserByEmail(user.email)
      if (!foundUser) {
        console.log(`User ${user.email} not found. Registering as new user.`)
        return true
      }
      if (!account) {
        throw new Error('Account not found')
      }
      const userIsHunter = userHasRole(foundUser, Role.HUNTER)
      if (
        (account.provider === 'github' && !userIsHunter) ||
        (account.provider === 'email' && userIsHunter)
      ) {
        console.log('ACCESS GRANTED')
        return true
      } else {
        throw new Error(
          `Error during sign-in: ACCESS DENIED - ${
            userIsHunter ? 'User with HUNTER role' : 'User without HUNTER role'
          } is not allowed to log in with ${account.provider} provider.`,
        )
      }
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // if user does not exist:
      // - add role SPECIALIST when loged in with github
      // - add role HUNTER when loged in with magic link

      if (!isNewUser) return
      if (!account) throw new Error('Account not found')

      let roleToAdd: Role = 'USER'
      if (account.provider === 'github') {
        if (!profile?.login || !user.id) {
          throw new Error('GitHub profile login or user ID not provided.')
        }
        await createGithubDetails(user.id, profile.login as string)
        roleToAdd = Role.SPECIALIST
      } else if (account.provider === 'email') {
        roleToAdd = Role.HUNTER
      } else {
        throw new Error('Provider not recognized')
      }

      if (user.id) {
        await addUserRole(user.id, roleToAdd)
      } else {
        throw new Error('No user ID found for adding role.')
      }
    },
  },
})
