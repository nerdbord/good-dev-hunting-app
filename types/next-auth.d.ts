import NextAuth, { DefaultSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/src/jwt/types'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      email: string
    }
  }

  interface JWT extends Record<string, unknown>, DefaultJWT {
    id: string
  }
}
