import { prisma } from '@/lib/prismaClient'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { type AdapterUser } from 'next-auth'
import { type JWT } from 'next-auth/jwt'
import Github, { type GitHubProfile } from 'next-auth/providers/github'
import LinkedIn, { type LinkedInProfile } from 'next-auth/providers/linkedin'
import { findUserById } from './app/[locale]/(auth)/_actions'
import { createOrUpdateGitHubDetailsForUser } from './backend/github-details/github-details.service'
import { sendMagicLinkEmail } from './backend/mailing/mailing.service'
import { AppRoutes } from './utils/routes'

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
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile: (profile: LinkedInProfile): AdapterUser => {
        return {
          id: profile.sub.toString(),
          email: profile.email,
          avatarUrl: profile.picture,
        }
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile: (profile: GitHubProfile): AdapterUser => {
        return {
          id: profile.id.toString(),
          email: profile.email as AdapterUser['email'],
          avatarUrl: profile.avatar_url,
        }
      },
    }),
    {
      id: 'email',
      name: 'Email',
      type: 'email',
      maxAge: 60 * 60 * 24, // Email link will expire in 24 hours
      sendVerificationRequest: async ({
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
      },
    },
  ],
  pages: {
    // must be named like this - otherwise throws error when route with search params
    signIn: AppRoutes.signIn,
    error: AppRoutes.error,
  },

  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      try {
        if (trigger === 'signUp' && user) {
          // Create token during sign-up, include profile data if available
          token = {
            ...token,
            id: user.id as JWT['id'],
            email: user.email as JWT['email'],
            avatarUrl: user.avatarUrl || null,
            name: profile?.name || null,
            githubUsername: (profile?.login as JWT['githubUsername']) || null,
            provider: account?.provider as JWT['provider'],
            profileId: null,
            profileSlug: null,

            // @ts-expect-error - user.roles exist because it is autogenerated by prisma
            roles: user.roles,
            lastValidated: new Date().toISOString(),
          }
        } else if ((trigger === 'signIn' && user?.id) || !token.lastValidated) {
          // Fetch the latest user data from the database on sign-in
          // Handle tokens without lastValidated (e.g., for users logged in before implementation of new auth in PR 373)
          const foundUser = await findUserById(user?.id || token.id)
          if (foundUser) {
            token = {
              ...token,
              id: foundUser.id,
              email: foundUser.email,
              avatarUrl: foundUser.avatarUrl,
              name: foundUser.name || profile?.name || null,
              roles: foundUser.roles,
              githubUsername: foundUser.githubUsername,
              profileId: foundUser.profileId,
              profileSlug: foundUser.profileSlug,

              // Fetch provider name on signIn
              provider: account?.provider as JWT['provider'],
              lastValidated: new Date().toISOString(),
            }
          } else {
            // User no longer exists, invalidate the token
            return null
          }
        } else if (trigger === 'update' && session?.user) {
          // Update token based on session updates from the client

          token = {
            ...token,
            avatarUrl: session.user.avatarUrl,
            name: session.user.name,
            profileId: session.user.profileId,
            profileSlug: session.user.profileSlug,
            lastValidated: new Date().toISOString(),
            // add more fields here if needed in future to do an update through useSession().update
          }
        } else {
          if (token.roles.length === 1) {
            // Update roles if there is no updated roles on signUp
            // (we can't update roles through session update in server component)
            // this is a workaround for now
            const foundUser = await findUserById(token.id)
            if (foundUser) {
              token = {
                ...token,
                roles: foundUser.roles,
              }
            }
          }

          // For other calls, conditionally validate token based on lastValidated
          const FIVE_MINUTES = 5 * 60 * 1000
          const now = Date.now()
          const lastValidated = new Date(
            token.lastValidated as string,
          ).getTime()

          if (now - lastValidated > FIVE_MINUTES) {
            // Revalidate token by fetching latest user data
            const foundUser = await findUserById(token.id)
            if (foundUser) {
              token = {
                ...token,
                id: foundUser.id,
                email: foundUser.email,
                avatarUrl: foundUser.avatarUrl,
                name: foundUser.name || profile?.name || null,
                roles: foundUser.roles,
                githubUsername: foundUser.githubUsername,
                profileId: foundUser.profileId,
                profileSlug: foundUser.profileSlug,
                provider: account?.provider as JWT['provider'],
                lastValidated: new Date().toISOString(),
              }
            } else {
              // User no longer exists, invalidate the token
              return null
            }
          }
        }
      } catch (error) {
        console.error('auth.ts - Error in JWT callback:', error)
        return null
      }

      return token
    },
    session({ session, token }) {
      // @ts-expect-error - emailVerified is redundant
      session.user = {
        id: token.id,
        email: token.email,
        avatarUrl: token.avatarUrl,
        name: token.name,
        roles: token.roles,
        githubUsername: token.githubUsername,
        profileId: token.profileId,
        profileSlug: token.profileSlug,
      }
      session.provider = token.provider

      return session
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      if (user.id && account?.provider && profile) {
        if (account.provider === 'github') {
          await createOrUpdateGitHubDetailsForUser(
            user.id,
            profile.login as GitHubProfile['login'],
          )
        }
      }
    },
  },
})
