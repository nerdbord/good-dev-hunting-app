import { type Role } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
  interface User {
    id?: string
    email?: string | null
    avatarUrl?: string | null
    githubUsername?: string | null
    linkedinUsername?: string | null
  }

  interface AdapterUser {
    id?: string
    email?: string | null
    avatarUrl?: string | null
    githubUsername?: string | null
    linkedinUsername?: string | null
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      email: string
      image: string
      name: string
      roles: Role[]
      profileId: string | null
      githubUsername: string | null
      linkedinUsername: string | null
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
    roles: Role[]
    profileId: string | null
    githubUsername: string | null
    linkedinUsername: string | null
  } | null
}
