'use server'
import { sendWelcomeEmail } from '@/backend/mailing/mailing.service'
import { addUserRole } from '@/backend/user/user.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { AppRoutes } from '@/utils/routes'
import { Role, type User } from '@prisma/client'
import { type Session } from 'next-auth'
import { redirect } from 'next/navigation'
import {
  getAuthorizedUser,
  userHasRole,
} from '../../../../../utils/auth.helpers'

type SearchParams = Promise<{
  role?: Role
  redirectTo?: string
}>

const validRoles: Role[] = [Role.SPECIALIST, Role.HUNTER]

const safeDecodeURIComponent = (
  uriComponent: string | undefined,
): string | null => {
  if (!uriComponent) return null
  try {
    return decodeURIComponent(uriComponent)
  } catch (e) {
    console.error('Failed to decode URI component:', uriComponent, e)
    sendDiscordNotificationToModeratorChannel(`
  Invalid redirectTo parameter received: ${uriComponent}`).catch(console.error)
    return null
  }
}

const getRedirectTarget = (
  user: Session['user'] | User,
  userHasProfile: boolean,
  decodedRedirectTo: string | null,
): string => {
  if (decodedRedirectTo) {
    if (
      decodedRedirectTo.startsWith('/') ||
      decodedRedirectTo.startsWith(process.env.NEXT_PUBLIC_APP_URL || '')
    ) {
      console.log(`Redirecting to specified redirectTo: ${decodedRedirectTo}`)
      return decodedRedirectTo
    } else {
      console.warn(
        `Ignoring potentially unsafe redirectTo: ${decodedRedirectTo}`,
      )
    }
  }
  if (userHasRole(user, Role.SPECIALIST)) {
    return userHasProfile ? AppRoutes.myProfile : AppRoutes.createProfile
  } else if (userHasRole(user, Role.HUNTER)) {
    return AppRoutes.myJobs
  } else {
    return AppRoutes.home
  }
}

const OAuth = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams
  const { user, provider, userIsHunter, userIsSpecialist } =
    await getAuthorizedUser()
  if (!user) return redirect(AppRoutes.signIn)
  let userData: Session['user'] | null = { ...user }

  const { role: roleParam, redirectTo: redirectToParam } = searchParams
  const decodedRedirectTo = safeDecodeURIComponent(redirectToParam)

  const role = validRoles.includes(roleParam as Role)
    ? (roleParam as Role)
    : null
  const devName = userData.name || userData.githubUsername || userData.email

  // if user tries to assign himself a role other than HUNTER or SPECIALIST
  // send notification and throw error
  if (!role) {
    await sendDiscordNotificationToModeratorChannel(
      `Unauthorized role assignment attempt by **${devName}** **(${userData.email})**: **${roleParam}**`,
    )
    return redirect(`${AppRoutes.error}?error=Invalid role specified.`)
  }

  // Assign role and send notifications
  if (
    (role === Role.HUNTER && !userIsHunter) ||
    (role === Role.SPECIALIST && !userIsSpecialist)
  ) {
    userData = await addUserRole(user.id, role)
    if (!userData)
      return redirect(`${AppRoutes.error}?error=Role assignment failed.`)

    await sendWelcomeEmail({
      email: userData.email,
      username: devName || userData.email,
      locale: userData.language,
    })
    await sendDiscordNotificationToModeratorChannel(
      `User ${
        devName ? `**${devName}** ` : ''
      }has created an account with **${provider?.toUpperCase()}** as **${role.toUpperCase()}** with **${
        userData.email
      }**`,
    ).catch(console.error)
  }

  // We need to use updated user here because session is not updated yet
  const targetUrl = getRedirectTarget(
    userData,
    !!userData.profileId,
    decodedRedirectTo,
  )
  return redirect(targetUrl)
}

export default OAuth
