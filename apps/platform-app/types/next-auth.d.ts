import type { Role, UserLanguage } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email?: string | null // Make email optional as some providers might not return it reliably initially
    avatarUrl?: string | null
  }

  interface AdapterUser extends User {
    id: string
    email: string
    emailVerified?: Date | null
    avatarUrl?: string | null
    name?: string | null
    roles: Role[]
    language: UserLanguage | null
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      email: string
      avatarUrl?: string | null
      name?: string | null
      roles: Role[]
      profileId?: string | null
      githubUsername?: string | null
      profileSlug?: string | null
      language: UserLanguage | null
      emailVerified?: Date | null
    }
    provider?: string
  }
}

import 'next-auth/jwt'
declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    avatarUrl?: string | null
    name?: string | null
    roles: Role[]
    profileId?: string | null
    githubUsername?: string | null
    provider?: string
    profileSlug?: string | null
    language: UserLanguage | null
    lastValidated?: string
    emailVerified: Date | null
  }
}
