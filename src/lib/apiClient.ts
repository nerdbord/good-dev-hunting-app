import {
  CreateProfilePayload,
  ProfileModel,
} from '@/data/frontend/profile/types'
import { httpClient } from '@/lib/httpClient'

const API_URL = 'http://localhost:3000/api'

export const apiClient = {
  togglePublishMyProfile: async (profileId: string) => {
    const toggledProfile = await httpClient.post<undefined, ProfileModel>(
      `${API_URL}/profiles/${profileId}/publish`,
    )

    return toggledProfile
  },
  createMyProfile: async (payload: CreateProfilePayload) => {
    const createdProfile = await httpClient.post<
      CreateProfilePayload,
      ProfileModel
    >('/api/profiles', payload)

    return createdProfile
  },
  getUserProfile: async () => {
    try {
      const profile = await httpClient.get<ProfileModel>(
        `${API_URL}/profiles/me`,
      )

      return profile
    } catch (error) {
      console.error(error)
    }
  },
  updateMyProfile: async (payload: CreateProfilePayload) => {
    const updatedProfile = await httpClient.put<
      CreateProfilePayload,
      ProfileModel
    >('/api/profiles/me', payload)

    return updatedProfile
  },
}
