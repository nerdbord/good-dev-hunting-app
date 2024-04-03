import { type UserWithRelations } from './user.types'

export const serializeUserToUserPayload = (data: UserWithRelations) => {
  return {
    id: data.id,
    profileId: data.profile?.id || '',
    roles: data.roles,
    githubDetails: {
      username: data.githubDetails?.username || null,
    },
    email: data.email,
  }
}
