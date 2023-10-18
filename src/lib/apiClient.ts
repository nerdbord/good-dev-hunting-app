import {
  CreateProfilePayload,
  ProfileModel,
} from '@/data/frontend/profile/types'
import { httpClient } from '@/lib/httpClient'
import { PutBlobResult } from '@vercel/blob'

const API_URL = 'http://localhost:3000/api'

export const apiClient = {
  publishMyProfile: async (profileId: string) => {
    const publishedProfile = await httpClient.post<undefined, ProfileModel>(
      `${API_URL}/profiles/${profileId}/publish`,
    )

    return publishedProfile
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
  uploadUserPhoto: async (selectedFile: File) => {
    const formData = new FormData()
    formData.append('file', selectedFile)

    const userPhoto = await httpClient.post<FormData, PutBlobResult>(
      '/api/files',
      formData,
    )
    return userPhoto
  },

  updateUserAvatar: async (avatarUrl: string) => {
    const userAvatar = await httpClient.put<{ avatarUrl: string }, any>(
      '/api/user/avatar',
      { avatarUrl },
    )
    return userAvatar
  },
}

