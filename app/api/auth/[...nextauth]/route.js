import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prismaClient'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  /*  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn(user, account, profile) {
      const email = profile.email;
      let existingUser = await prisma.user.findUnique({
        where: { email },
        include: { profile: true, githubDetails: true },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email,
            githubDetails: { create: {} }
          }
        });
      } 
      return true;
    } 
  }  */
})

export { handler as GET, handler as POST }
