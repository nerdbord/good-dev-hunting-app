import { createUser, doesUserExist } from '@/backend/user/user.service'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { CreateUserPayload } from '@/backend/user/user.types'
import { getServerSession } from 'next-auth'


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
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = account.providerAccountId

        if (token && token.email) {
          const email = token.email
          const id = token.sub
          const image = token.picture
          const name = token.name

          const existingUser = await doesUserExist(email)

          console.log('Existing user:', existingUser) // console log

          if (!existingUser) {
            if (email && id && image && name) {
              const newUser: CreateUserPayload = {
                email,
                id,
                image,
                name,
              }

              const createdUser = await createUser(newUser)

              console.log('Created user:', createdUser) // console log

              return createdUser
            }
          }
        }
      }

      return token
    },
  },
}

export const authorizeUser = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw Error('Unauthorized')
  }

  return session.user
}
