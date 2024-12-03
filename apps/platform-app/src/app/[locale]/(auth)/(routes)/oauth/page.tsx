'use server'
import { sendWelcomeEmail } from '@/backend/mailing/mailing.service'
import { addUserRole } from '@/backend/user/user.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { AppRoutes } from '@/utils/routes'
import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'
import { getAuthorizedUser, userHasRole } from '../../auth.helpers'

type SearchParams = Promise<{
  role?: Role
}>
const validRoles: Role[] = [Role.SPECIALIST, Role.HUNTER]

const OAuth = async (props: { searchParams: SearchParams }) => {
  const { user, userHasProfile, provider } = await getAuthorizedUser()
  if (!user) return redirect(AppRoutes.signIn)

  const { role: roleParam } = await props.searchParams
  const role = validRoles.includes(roleParam as Role)
    ? (roleParam as Role)
    : null
  const devName = user.name || user.githubUsername

  // if user tries to assign himself a role other than HUNTER or SPECIALIST
  // send notification and throw error
  if (!role) {
    await sendDiscordNotificationToModeratorChannel(
      `Unauthorized role assignment attempt by **${devName}** **(${user.email})**: **${roleParam}**`,
    )
    return redirect(`${AppRoutes.error}?error=Invalid role specified.`)
  }

  // Check if user already has the role
  if (userHasRole(user, Role.SPECIALIST)) {
    return userHasProfile
      ? redirect(AppRoutes.profilesList)
      : redirect(AppRoutes.createProfile)
  } else if (userHasRole(user, Role.HUNTER)) {
    return redirect(AppRoutes.profilesList)
  }

  // Assign role and send notifications
  const updatedUser = await addUserRole(user.id, role)
  if (!updatedUser)
    return redirect(`${AppRoutes.error}?error=Role assignment failed.`)

  await sendWelcomeEmail(user.email, devName || user.email)
  await sendDiscordNotificationToModeratorChannel(
    `User **${
      devName || ''
    }** has created an account with **${provider.toUpperCase()}** as ${role.toUpperCase()} with ${
      user.email
    }`,
  )

  // Redirect new user to profiles or create profile routes
  // We need to use updated user here because session is not updated yet
  if (userHasRole(updatedUser, Role.SPECIALIST)) {
    return userHasProfile
      ? redirect(AppRoutes.profilesList)
      : redirect(AppRoutes.createProfile)
  } else if (userHasRole(updatedUser, Role.HUNTER)) {
    return redirect(AppRoutes.profilesList)
  }
}

export default OAuth
