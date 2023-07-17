import { UserWithRelations } from './user.types'

export const serializeUserToUserPayload = (data: UserWithRelations) => {
  return {
    id: data.id,
    profileId: data.profile,
    githubDetails: {
      id: data.githubDetails?.id,
      username: data.githubDetails?.username,
      userId: data.githubDetails?.userId,
      image: data.githubDetails?.image,
    },
  }
}
