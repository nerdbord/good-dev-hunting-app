import { registerNewUser } from '@/app/[locale]/(auth)/_actions/mutations/registerNewUser'
import { userHasRole } from '@/app/[locale]/(auth)/auth.helpers'
import { prisma } from '@/lib/prismaClient'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Role } from '@prisma/client'
import NextAuth from 'next-auth'
import Email from 'next-auth/providers/email'
import Github, { type GitHubProfile } from 'next-auth/providers/github'
import LinkedIn, { type LinkedInProfile } from 'next-auth/providers/linkedin'
import { createUsername } from './app/[locale]/(profile)/_actions/queries/createUsername'
import { createGitHubDetailsForUser } from './backend/github-details/github-details.service'
import { createLinkedInDetailsForUser } from './backend/linkedin-details/linkedin-details.service'
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
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: registerNewUser,
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile: async (profile: LinkedInProfile) => {
        const name = `${profile.given_name} ${profile.family_name}`
        const linkedinUsername = await createUsername(name)

        return {
          id: profile.sub.toString(),
          email: profile.email,
          avatarUrl: profile.picture,
          linkedinUsername,
          provider: 'linkedin',
          name, // this property is used only in registerNewUser (prisma adapter custom method) to send welcome mail and discord notification
        }
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      allowDangerousEmailAccountLinking: true,
      profile: (profile: GitHubProfile) => {
        return {
          id: profile.id.toString(),
          email: profile.email,
          avatarUrl: profile.avatar_url,
          githubUsername: profile.login,
          provider: 'github',
          name: profile.name, // this property is used only in registerNewUser (prisma adapter custom method) to send welcome mail and discord notification
        }
      },
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
      session.user.image = foundUser.avatarUrl ? foundUser.avatarUrl : ''
      session.user.roles = foundUser.roles
      session.user.profileId = foundUser.profile ? foundUser.profile.id : null
      session.user.githubUsername = foundUser.githubDetails
        ? foundUser.githubDetails.username
        : ''
      session.user.linkedinUsername = foundUser.linkedinDetails
        ? foundUser.linkedinDetails.username
        : ''

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

      if (account.provider === 'email' && userIsHunter) {
        console.log('[Email provider & user is hunter] ACCESS GRANTED')
        return true
      } else if (account.provider === 'github' && !userIsHunter) {
        if (!profile?.login) {
          throw new Error(
            '[GitHub provider] GitHub profile login not provided.',
          )
        }
        const githubUsername = profile.login as string
        await createGitHubDetailsForUser(foundUser.id, githubUsername)
        console.log('ACCESS GRANTED')
        return true
      } else if (account.provider === 'linkedin' && !userIsHunter) {
        if (!profile?.given_name || !profile?.family_name) {
          throw new Error(
            '[Linkedin provider] LinkedIn profile given name or family name not provided.',
          )
        }
        const name = `${profile.given_name} ${profile.family_name}`
        const linkedinUsername = await createUsername(name)
        await createLinkedInDetailsForUser(foundUser.id, linkedinUsername)
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
          throw new Error(
            '[GitHub provider] GitHub profile login or user ID not provided.',
          )
        }
        roleToAdd = Role.SPECIALIST
        console.log(roleToAdd)
      } else if (account.provider === 'linkedin') {
        if (!user.id) {
          throw new Error('[LinkedIn provider] User ID not provided.')
        }
        roleToAdd = Role.SPECIALIST
      } else if (account.provider === 'email') {
        if (!user.id) {
          throw new Error('[Email provider] User ID not provided.')
        }
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
