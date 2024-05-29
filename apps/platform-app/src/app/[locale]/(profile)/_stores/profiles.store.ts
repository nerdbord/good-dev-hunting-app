import { type ContactRequestModel } from '@/app/[locale]/(profile)/_models/contact-request.model'
import { type ProfileViewModel } from '@/app/[locale]/(profile)/_models/profile-view.model'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { createStore } from 'zustand'

export type ProfilesState = {
  profiles: ProfileModel[]
  profile: ProfileModel | null
}

export type ProfilesActions = {
  setProfile(profileId: string): void
  markProfileAsVisited(profileView: ProfileViewModel): void
  markProfileAsContacted(contactRequest: ContactRequestModel): void
  resetProfile(): void
}

export type ProfilesStore = ProfilesState & ProfilesActions

export const createProfilesStore = (initState: ProfileModel[]) => {
  return createStore<ProfilesStore>()((set) => ({
    profiles: initState,
    profile: null,
    setProfile: (profileId) => {
      set((state) => {
        const profile = state.profiles.find((p) => p.id === profileId)

        if (!profile) return state

        return { ...state, profile }
      })
    },
    markProfileAsVisited: (profileView) => {
      set((state) => {
        const profile = state.profile

        if (!profile) return state

        const existingProfileView = profile.profileViews.find(
          (view) => view.viewerId === profileView.viewerId,
        )

        if (existingProfileView) {
          existingProfileView.createdAt = new Date()
          return state
        } else {
          profile.profileViews = [...profile.profileViews, profileView]

          return state
        }
      })
    },
    markProfileAsContacted: (contactRequest) => {
      set((state) => {
        const profile = state.profile

        if (!profile) return state

        profile.contactRequests = [...profile.contactRequests, contactRequest]

        return state
      })
    },
    resetProfile: () => {
      set({ profile: null })
    },
  }))
}
