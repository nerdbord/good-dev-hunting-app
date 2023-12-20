import 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      email: string
      image: string
      name: string
    }
  }
}

declare module 'next-auth/jwt' {
  type JWT = {
    id: string | null
    name?: string | null
    email?: string | null
    picture?: string | null
    sub?: string
  } | null
}
