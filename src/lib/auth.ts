import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { getServerSession } from 'next-auth'
import { prisma } from './prismaClient'

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
    session: async ({ session, token }) => {
      let user
      console.log('session in session', session)

      if (session) {
        const email = session.user.email
        const name = session.user.name
        const image = session.user.image

        if (email) {
          const foundUser = await prisma.user.findFirst({
            where: { email: email },
          })

          user = foundUser

          if (!foundUser && name) {
            const createdUser = await prisma.user.create({
              data: {
                email: email,
                githubDetails: {
                  create: {
                    username: name,
                    image: image,
                  },
                },
              },
              include: {
                githubDetails: true,
              },
            })

            user = createdUser
          }
        }
      }

      return {
        ...session,
        ...token,
        user: {
          id: user?.id,
          ...user,
        },
      }
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
