import { createUser, doesUserExist } from '@/backend/user/user.service'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { CreateUserPayload } from '@/backend/user/user.types'

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
  // adapter: PrismaAdapter(prisma),
  callbacks: {
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

          if (!existingUser) {
            if (email && id && image && name) {
              const newUser: CreateUserPayload = {
                email,
                id,
                image,
                name,
              }

              await createUser(newUser)
            }
          }
        }
      }
      return token
    },
  },
}
