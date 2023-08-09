import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      profileId: string | null
      id: string
      email: string
      image: string
      name: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string | null
  }
}
