import { type Role } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    avatarUrl?: string | null
    preferredLanguage?: string
  }

  interface AdapterUser {
    id: string
    email: string
    avatarUrl?: string | null
    preferredLanguage?: string
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      email: string
      avatarUrl: string | null
      name: string | null
      roles: Role[]
      profileId: string | null
      githubUsername: string | null
      profileSlug: string | null
      preferredLanguage: string
    }
    provider: string
  }
}

import 'next-auth/jwt'
declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    avatarUrl: string | null
    name: string | null
    roles: Role[]
    profileId: string | null
    githubUsername: string | null
    provider: string
    profileSlug: string | null
    preferredLanguage: string
  }
}
