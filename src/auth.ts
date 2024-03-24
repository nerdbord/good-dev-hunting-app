import { prisma } from '@/lib/prismaClient'

import LinkedIn from '@auth/core/providers/linkedin'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Role } from '@prisma/client'
import NextAuth from 'next-auth'
import Email from 'next-auth/providers/email'
import Github from 'next-auth/providers/github'
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
    // https://github.com/nextauthjs/next-auth/issues/8831

    // error {
    // error: 'invalid_client',
    // error_description: 'Client authentication failed'
    // }
    // [auth][error] CallbackRouteError: Read more at https://errors.authjs.dev#callbackrouteerror
    // [auth][cause]: Error: TODO: Handle OIDC response body error
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      client: { token_endpoint_auth_method: 'client_secret_post' },
      authorization: {
        url: 'https://www.linkedin.com/oauth/v2/authorization',
        params: { scope: 'openid profile email' },
      },
      wellKnown:
        'https://www.linkedin.com/oauth/.well-known/openid-configuration',
      issuer: 'https://www.linkedin.com',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      // userinfo: {
      //   url: 'https://api.linkedin.com/v2/me',
      //   params: {
      //     projection: ``,
      //   },
      // },
      token: {
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
      },
      userinfo: {
        url: 'https://api.linkedin.com/v2/userinfo',
      },
      async profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
        }
      },
    }),

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
          if (
            (account.provider === 'github' &&
              foundUser.roles.includes(Role.SPECIALIST)) ||
            (account.provider === 'linkedin' &&
              foundUser.roles.includes(Role.SPECIALIST)) ||
            (account.provider === 'email' &&
              foundUser.roles.includes(Role.HUNTER))
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
      if (account?.provider === 'github' || account?.provider === 'linkedin') {
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
