import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { createStore } from 'zustand'

export type ProfilesState = {
  profiles: ProfileModel[]
}

export type ProfilesActions = {}

export type ProfilesStore = ProfilesState & ProfilesActions

export const createProfilesStore = (initState: ProfileModel[]) => {
  return createStore<ProfilesStore>()((set) => ({
    profiles: initState,
  }))
}
