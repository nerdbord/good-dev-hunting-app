import { type ContactRequestModel } from '@/app/[locale]/(profile)/_models/contact-request.model'
import { type ProfileViewModel } from '@/app/[locale]/(profile)/_models/profile-view.model'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { createStore } from 'zustand'

export type ProfileState = {
  profile: ProfileModel
}

export type ProfileActions = {
  markProfileAsVisited(profileView: ProfileViewModel): void
  markProfileAsContacted(contactRequest: ContactRequestModel): void
}

export type ProfileStore = ProfileState & ProfileActions

export const createProfileStore = (initState: ProfileModel) => {
  return createStore<ProfileStore>()((set) => ({
    profile: initState,
    markProfileAsVisited: (profileView) => {
      set((state) => {
        const profile = state.profile

        if (profile.id !== profileView.viewedProfileId) return state

        const existingProfileView = profile.profileViews.find(
          (view) => view.viewerId === profileView.viewerId,
        )

        if (existingProfileView) {
          existingProfileView.createdAt = new Date()
          return state
        } else {
          return {
            profile: {
              ...profile,
              profileViews: [...profile.profileViews, profileView],
            },
          }
        }
      })
    },
    markProfileAsContacted: (contactRequest) => {
      set((state) => {
        const profile = state.profile

        if (profile.id !== contactRequest.profileId) return state

        return {
          profile: {
            ...profile,
            contactRequests: [...profile.contactRequests, contactRequest],
          },
        }
      })
    },
  }))
}
