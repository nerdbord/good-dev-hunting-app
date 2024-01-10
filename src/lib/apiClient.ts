/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateProfilePayload,
  ProfileModel,
  PublishingStateData,
  RejectionReason,
} from '@/data/frontend/profile/types'
import { httpClient } from '@/lib/httpClient'
import { Profile } from '@prisma/client'
import { PutBlobResult } from '@vercel/blob'

export const apiClient = {
  publishMyProfile: async (profileId: string) => {
    // the function didn't receive ProfileModel, it had received Profile instead (from updateUserData);
    const publishedProfile = await httpClient.post<undefined, Profile>(
      `/api/profiles/${profileId}/publish`,
    )
    await httpClient.post('/api/discord', {
      message: `User ${publishedProfile.fullName} has published profile`,
      link: `http://localhost:3000/dashboard/profile/${publishedProfile.userId}`,
    })

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
      const profile = await httpClient.get<ProfileModel>(`/api/profiles/me`)

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
      >(`/api/profiles/${profileId}/state`, payload)

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
      >(`/api/profiles/${profileId}/reject`, payload)
      return savedRejectingReason
    } catch (error) {
      console.log(error)
    }
  },
  userPhotoUpload: async (file: File) => {
    try {
      const { url } = await httpClient.postPhoto<PutBlobResult>(
        '/api/files',
        file,
      )
      return url
    } catch (error) {
      throw new Error(error as string)
    }
  },
}
