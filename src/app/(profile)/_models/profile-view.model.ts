import { type ProfileView } from '@prisma/client'

export type ProfileViewModel = ProfileView

export function createProfileViewModel(data: ProfileView): ProfileViewModel {
  return {
    id: data.id,
    viewerId: data.viewerId,
    viewedProfileId: data.viewedProfileId,
    createdAt: data.createdAt,
  }
}
