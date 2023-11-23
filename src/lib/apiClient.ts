/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateProfilePayload,
  ProfileModel,
  PublishingStateData,
  RejectionReason,
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
  updateProfileState: async (
    profileId: string,
    payload: PublishingStateData,
  ) => {
    try {
      const updatedProfileState = await httpClient.patch<
        PublishingStateData,
        ProfileModel
      >(`${API_URL}/profiles/${profileId}/state`, payload)

      return updatedProfileState
    } catch (error) {
      console.log(error)
    }
  },
  createRejectionReason: async (
    profileId: string,
    payload: RejectionReason,
  ) => {
    try {
      const savedRejectingReason = await httpClient.post<
        RejectionReason,
        RejectionReason
      >(`${API_URL}/profiles/${profileId}/reject`, payload)
      return savedRejectingReason
    } catch (error) {
      console.log(error)
    }
  },
  userPhotoUpload: async (file: File) => {
    console.log('API call to upload user photo...')
    const { url } = await httpClient.postPhoto<PutBlobResult>(
      '/api/files',
      file,
    )
    console.log('API response for photo upload:', url)
    return url
  },
}
