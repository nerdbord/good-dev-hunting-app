import { prisma } from '@/lib/prismaClient'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserLanguage } from '@prisma/client'
import NextAuth from 'next-auth'
import Github, { type GitHubProfile } from 'next-auth/providers/github'
import LinkedIn, { type LinkedInProfile } from 'next-auth/providers/linkedin'
import { cookies } from 'next/headers'
import { findUserById } from './app/[locale]/(auth)/_actions'
import { createOrUpdateGitHubDetailsForUser } from './backend/github-details/github-details.service'
import { sendMagicLinkEmail } from './backend/mailing/mailing.service'
import {
  defaultLocale,
  locales,
  nextIntlCookieName,
  type Locale,
} from './i18n/routing'
import { AppRoutes } from './utils/routes'

// Type alias for AdapterUser based on our definition in next-auth.d.ts
type AppAdapterUser = import('next-auth/adapters').AdapterUser

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      // Return type should provide minimum fields for adapter to find/create user
      profile: (
        profile: LinkedInProfile,
      ): Pick<AppAdapterUser, 'id' | 'email' | 'avatarUrl'> => {
        return {
          id: profile.sub.toString(),
          email: profile.email, // Assuming email is always present
          avatarUrl: profile.picture,
        }
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile: (
        profile: GitHubProfile,
      ): Pick<AppAdapterUser, 'id' | 'email' | 'avatarUrl' | 'name'> => {
        if (!profile.email) {
          throw new Error(
            'Nie można pobrać adresu email z profilu GitHub. ' +
              'Upewnij się, że masz publiczny adres email w ustawieniach GitHub lub użyj innej metody logowania.',
          )
        }
        return {
          id: profile.id.toString(),
          email: profile.email ?? null, // Handle potentially null email from GitHub
          avatarUrl: profile.avatar_url,
          // name: profile.name ?? null, // Include name if available
        }
      },
    }),
    {
      id: 'email',
      name: 'Email',
      type: 'email',
      maxAge: 60 * 60 * 24, // Email link will expire in 24 hours
      sendVerificationRequest: async ({ url, identifier }) => {
        let determinedLocale: Locale = defaultLocale // Default
        try {
          // Attempt to read locale from cookie if context allows
          const localeFromCookie = (await cookies()).get(nextIntlCookieName)
            ?.value as Locale | undefined
          if (
            localeFromCookie &&
            (locales as ReadonlyArray<string>).includes(localeFromCookie)
          ) {
            determinedLocale = localeFromCookie
          }
        } catch (e) {
          // cookies() might not be available in all contexts this runs
          console.warn(
            'Could not read locale cookie in sendVerificationRequest:',
            e instanceof Error ? e.message : e,
          )
        }

        try {
          console.log(
            `Sending magic link email to ${identifier} with locale ${determinedLocale}`,
          )
          await sendMagicLinkEmail({
            email: identifier,
            url,
            locale: determinedLocale,
          })
        } catch (error) {
          console.error('Failed to send verification email:', error)
          // Throwing the specific error might give more context than a generic message
          throw new Error(
            `Failed to send verification email. Reason: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`,
          )
        }
      },
    },
  ],
  pages: {
    signIn: AppRoutes.signIn,
    error: AppRoutes.error,
  },

  callbacks: {
    // --- JWT Callback ---
    async jwt({ token, user, account, trigger, session }) {
      // `user` object here is the user returned by the adapter (or profile func on first login)
      // It should align with the AdapterUser type.

      let userFromDb: Awaited<ReturnType<typeof findUserById>> | null = null
      const isSignInOrSignUp = trigger === 'signIn' || trigger === 'signUp'
      // Check if token needs revalidation (older than 5 mins or missing validation timestamp)
      const needsRevalidation =
        !token.lastValidated ||
        Date.now() - new Date(token.lastValidated).getTime() > 5 * 60 * 1000

      const userIdToFetch = user?.id || token?.id // Get ID from user (initial) or token

      // --- 1. Fetch User Data from DB if needed ---
      if (userIdToFetch && (isSignInOrSignUp || needsRevalidation)) {
        try {
          userFromDb = await findUserById(userIdToFetch)
          if (!userFromDb) {
            console.warn(
              `User not found in DB for ID: ${userIdToFetch}. Invalidating token.`,
            )
            return null // Invalidate token if user not found
          }
        } catch (error) {
          console.error('auth.ts - Error fetching user in JWT callback:', error)
          return null // Invalidate token on DB error
        }
      }

      // --- 2. Populate/Update Token ---
      try {
        // On Sign-in/Sign-up: Populate token initially using DB data
        if (isSignInOrSignUp && userFromDb) {
          token.id = userFromDb.id
          token.email = userFromDb.email // Should not be null based on schema
          token.avatarUrl = userFromDb.avatarUrl
          token.name = userFromDb.name // Fetch name from DB
          token.roles = userFromDb.roles
          token.githubUsername = userFromDb.githubUsername
          token.profileId = userFromDb.profileId
          token.profileSlug = userFromDb.profileSlug
          token.language = userFromDb.language // Get initial language from DB
          token.emailVerified = userFromDb.emailVerified
          token.provider = account?.provider // Get provider from account on sign-in/up
          token.lastValidated = new Date().toISOString()
        }
        // On Session Update Trigger: Update specific fields from session data passed via update()
        else if (trigger === 'update' && session?.user) {
          // Only update fields that are explicitly passed and allowed
          token.avatarUrl = session.user.avatarUrl ?? token.avatarUrl
          token.name = session.user.name ?? token.name
          token.profileId = session.user.profileId ?? token.profileId
          token.profileSlug = session.user.profileSlug ?? token.profileSlug
          token.language = session.user.language ?? token.language // Allow language update via session
          token.lastValidated = new Date().toISOString() // Mark as revalidated
        }
        // On Revalidation: Refresh token data from DB if fetched
        else if (needsRevalidation && userFromDb) {
          token.id = userFromDb.id
          token.email = userFromDb.email
          token.avatarUrl = userFromDb.avatarUrl
          token.name = userFromDb.name
          token.roles = userFromDb.roles
          token.githubUsername = userFromDb.githubUsername
          token.profileId = userFromDb.profileId
          token.profileSlug = userFromDb.profileSlug
          token.language = userFromDb.language // Refresh language
          // token.provider likely doesn't change, keep existing or refresh if needed
          token.lastValidated = new Date().toISOString()
        }
        // Fallback role update (if still needed, check if revalidation covers this)
        else if (
          token.id &&
          token.roles &&
          token.roles.length === 1 &&
          !userFromDb
        ) {
          // Only run if we didn't just fetch from DB
          const currentUserState = await prisma.user.findUnique({
            where: { id: token.id },
            select: { roles: true, language: true },
          })
          if (currentUserState) {
            token.roles = currentUserState.roles
            // Update language if it changed outside the normal flow and wasn't just set below
            if (token.language !== currentUserState.language) {
              token.language = currentUserState.language
              // No need to update lastValidated here unless this is considered a revalidation
            }
          }
        }

        // --- 3. Set Language if Missing ---
        // Run this *after* token has been populated/refreshed with DB data
        if (token.id && token.language === null) {
          console.log(
            `User ${token.id} language is null. Attempting to set from cookie.`,
          )
          try {
            const localeFromCookie = (await cookies()).get(nextIntlCookieName)
              ?.value as Locale | undefined
            console.log(
              `>>> JWT Callback - Locale from '${nextIntlCookieName}' cookie:`,
              localeFromCookie,
            )
            // Determine the preferred language, ensuring it's a valid UserLanguage
            let preferredLanguage: UserLanguage = defaultLocale as UserLanguage // Start with default

            if (
              localeFromCookie &&
              Object.values(UserLanguage).includes(
                localeFromCookie as UserLanguage,
              )
            ) {
              preferredLanguage = localeFromCookie as UserLanguage
            } else if (localeFromCookie) {
              console.warn(
                `Locale from cookie ('${localeFromCookie}') is not a valid UserLanguage enum value. Using default '${defaultLocale}'.`,
              )
            }
            // else: cookie missing or invalid, defaultLocale (as UserLanguage) is already set

            console.log(
              `Attempting to update DB language for user ${token.id} to ${preferredLanguage}`,
            )
            const updatedUser = await prisma.user.update({
              where: { id: token.id },
              data: { language: preferredLanguage },
              select: { language: true }, // Select only the updated field
            })

            // Update the token immediately with the value confirmed from the DB
            token.language = updatedUser.language
            token.lastValidated = new Date().toISOString() // Mark token as updated/validated
            console.log(
              `Successfully set language for user ${token.id} to ${token.language}`,
            )
          } catch (error) {
            console.error(
              `Failed to read cookie or update language for user ${token.id}:`,
              error,
            )
            // Fallback: Set default language in token only to maintain session consistency for this request
            // The DB might still be null, but the next session refresh should pick it up if updated elsewhere.
            if (token.language === null) {
              // Check again in case of race condition/error before update
              token.language = defaultLocale as UserLanguage
              console.warn(
                `Set language to default ('${token.language}') in token only for user ${token.id} due to error.`,
              )
            }
          }
        }
      } catch (error) {
        console.error(
          'auth.ts - Error processing token population/update:',
          error,
        )
        return null // Invalidate token on general processing error
      }

      // --- 4. Return final token ---
      // Ensure token has essential fields before returning
      if (!token.id || typeof token.email !== 'string' || !token.email) {
        // <--- Dodano sprawdzenie typu i wartości email
        console.error(
          'Token is missing essential fields (id or valid email). Invalidating.',
          { tokenId: token.id, tokenEmail: token.email },
        )
        return null // Zwróć null, jeśli ID lub email są nieprawidłowe
      }

      // Jeśli doszliśmy tutaj, token.id i token.email są poprawnymi stringami
      return token // Zwróć poprawny token
    },

    // --- Session Callback ---
    session({ session, token }) {
      // Transfer data from the (potentially updated) JWT token to the session object
      // Make sure the fields here match the `Session['user']` interface in `next-auth.d.ts`
      if (token?.id && token.email) {
        // Check if token is valid and has an ID
        session.user = {
          id: token.id,
          email: token.email, // Use email from token (can be null based on JWT type)
          avatarUrl: token.avatarUrl,
          name: token.name,
          roles: token.roles || [], // Default to empty array if roles somehow missing
          githubUsername: token.githubUsername,
          profileId: token.profileId,
          profileSlug: token.profileSlug,
          emailVerified: token.emailVerified,
          language: token.language, // Use language from token (UserLanguage | null)
        }
        session.provider = token.provider // Assign provider from token
      } else {
        // If token is invalid/null, we might want to return an empty/unauthenticated session structure
        // or rely on NextAuth default behavior which usually redirects.
        // For type safety, ensure session structure matches even if empty:
        // session.user = { id: '', roles: [], language: null /* ... other fields null/default */ };
        console.warn('Session callback received invalid token.')
        // Depending on strictness, you might modify the session object or let NextAuth handle it.
      }
      return session
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      // Keep your existing GitHub details logic
      if (user.id && account?.provider === 'github' && profile?.login) {
        try {
          await createOrUpdateGitHubDetailsForUser(
            user.id,
            profile.login as string, // Use profile.login safely
          )
        } catch (error) {
          console.error(
            `Failed to create/update GitHub details for user ${user.id}:`,
            error,
          )
        }
      }
      // Language setting is now handled in the JWT callback.
    },
  },
})
