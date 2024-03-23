import { prisma } from '@/lib/prismaClient'

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
    signIn: AppRoutes.login,
    error: AppRoutes.loginError,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // WORKS for existing user with role added
      // if user exists - must login with the same provider

      // !!!!!!!
      // if hunter tries to log in with github
      // his id is different then the one in db so this guard below is useless then
      // and app redirects to page which does not exist api/auth/login?error.... instead of /login?error or /error
      if (user.email) {
        const foundUser = await findUserByEmail(user.email)
        console.log(user.id)
        console.log(user.email)
        console.log(foundUser)

        if (foundUser && account) {
          console.log(account.provider)
          console.log(foundUser.roles)
          if (
            (account.provider === 'github' &&
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

        // if user doen not exist:
        // - add role SPECIALIST when loged in with github
        // - add role HUNTER when loged in with magic link

        // if (!foundUser) {
        //   console.log('USER NOT REGISTERED YET')
        //   // if (!user.id) {
        //   let roleToAdd: Role = 'USER'

        //   if (account?.provider === 'github') {
        //     roleToAdd = Role.SPECIALIST
        //     console.log('added specialist')
        //   } else if (account?.provider === 'email') {
        //     roleToAdd = Role.HUNTER
        //     console.log('added hunter')
        //   }

        //   // here is a problem because id does not match
        //   // i think this should go somewhere else because it should be executed after succesfull login
        //   if (roleToAdd) {
        //     console.log('Found role to add ' + roleToAdd)
        //     // addUserRole expects id
        //     if (user.id) {
        //       console.log('Found user id: ' + user.id)
        //       addUserRole(user.id, roleToAdd)
        //       console.log('Role added!!!!<3 ' + roleToAdd)
        //     } else {
        //       console.log('NO ID FOUND')
        //     }
        //     return true
        //   } else {
        //     console.log('ERROR: Provider not recognized.')
        //     return false
        //   }
        // }
      }
      console.log('[PROVIDER USED -->>>]: ' + account?.provider)

      return true
    },
  },
  events: {
    signIn({ user, account, profile, isNewUser }) {
      console.log(
        'this is from sign in event ================== ' + account?.provider,
      )
      console.log('isNewUser????===================== ' + isNewUser)

      // if user doen not exist:
      // - add role SPECIALIST when loged in with github
      // - add role HUNTER when loged in with magic link
      if (!isNewUser) return

      let roleToAdd: Role = 'USER'
      if (account?.provider === 'github') {
        roleToAdd = Role.SPECIALIST
        console.log('added specialist')
      } else if (account?.provider === 'email') {
        roleToAdd = Role.HUNTER
        console.log('added hunter')
      }

      if (roleToAdd) {
        console.log('Found role to add ' + roleToAdd)
        if (user.id) {
          console.log('Found user id: ' + user.id)
          addUserRole(user.id, roleToAdd)
          console.log('Role added!!!!<3 ' + roleToAdd)
        } else {
          console.log('NO ID FOUND')
        }
      }
    },
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
