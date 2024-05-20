import { type ContactRequestModel } from '@/app/[locale]/(profile)/_models/contact-request.model'
import { type ProfileViewModel } from '@/app/[locale]/(profile)/_models/profile-view.model'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { createStore } from 'zustand'

export type ProfilesState = {
  profiles: ProfileModel[]
}

export type ProfilesActions = {
  markProfileAsVisited(profileView: ProfileViewModel): void
  markProfileAsContacted(contactRequest: ContactRequestModel): void
}

export type ProfilesStore = ProfilesState & ProfilesActions

export const createProfilesStore = (initState: ProfileModel[]) => {
  return createStore<ProfilesStore>()((set) => ({
    profiles: initState,
    markProfileAsVisited: (profileView) => {
      set((state) => ({
        profiles: state.profiles.map((profile) => {
          if (profile.id !== profileView.viewedProfileId) return profile

          const existingProfileView = profile.profileViews.find(
            (view) => view.viewerId === profileView.viewerId,
          )

          let profileViews: ProfileViewModel[]

          if (existingProfileView) {
            profileViews = profile.profileViews.map((view) => {
              if (view.viewerId !== profileView.viewerId) return view

              return { ...view, createdAt: new Date() }
            })
          } else {
            profileViews = [...profile.profileViews, profileView]
          }

          return {
            ...profile,
            profileViews: profileViews,
          }
        }),
      }))
    },
    markProfileAsContacted: (contactRequest) => {
      set((state) => ({
        profiles: state.profiles.map((profile) => {
          if (profile.id !== contactRequest.profileId) return profile

          return {
            ...profile,
            contactRequests: [...profile.contactRequests, contactRequest],
          }
        }),
      }))
    },
  }))
}
