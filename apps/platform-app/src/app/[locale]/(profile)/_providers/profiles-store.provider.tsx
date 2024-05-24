'use client'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import {
  type ProfilesStore,
  createProfilesStore,
} from '@/app/[locale]/(profile)/_stores/profiles.store'
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef
} from 'react'
import { type StoreApi, useStore } from 'zustand'

export const ProfilesStoreContext =
  createContext<StoreApi<ProfilesStore> | null>(null)

export const ProfilesStoreProvider = ({
  children,
  initialProfiles,
}: PropsWithChildren<{ initialProfiles: ProfileModel[] }>) => {
  const storeRef = useRef<StoreApi<ProfilesStore>>()

  if (!storeRef.current) {
    storeRef.current = createProfilesStore(initialProfiles)
  }

  return (
    <ProfilesStoreContext.Provider value={storeRef.current}>
      {children}
    </ProfilesStoreContext.Provider>
  )
}

export const useProfilesStore = <T,>(
  selector: (store: ProfilesStore) => T
): T => {
  const profilesStoreContext = useContext(ProfilesStoreContext)

  if (!profilesStoreContext) {
    throw new Error(
      'useProfilesStore must be used within a ProfilesStoreProvider',
    )
  }

  return useStore(profilesStoreContext, selector)
}