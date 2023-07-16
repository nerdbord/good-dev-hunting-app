import { createUser, doesUserExist } from '@/backend/user/user.service'
import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import GithubProvider from 'next-auth/providers/github'
import { CreateUserPayload } from '@/backend/user/user.types'
// import { CreateContextOptions } from 'vm'
// import { CreateUserPayload } from '@/backend/user/user.types'

const prisma = new PrismaClient()

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
    async signIn({ user, account, profile }) {
      if (user) {
        console.log('User:', user)
        console.log('Account:', account)
        console.log('Profile:', profile)

        const email = user.email
        const id = user.id
        const image = user.image
        const name = user.name

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
      return true
    },
  },
}
