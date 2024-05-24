'use client'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import {
  createProfileStore,
  type ProfileStore,
} from '@/app/[locale]/(profile)/_stores/profile.store'
import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from 'react'
import { useStore, type StoreApi } from 'zustand'

export const ProfileStoreContext = createContext<StoreApi<ProfileStore> | null>(
  null,
)

export const ProfileStoreProvider = ({
  children,
  profile,
}: PropsWithChildren<{ profile: ProfileModel }>) => {
  const storeRef = useRef<StoreApi<ProfileStore>>()

  if (!storeRef.current) {
    storeRef.current = createProfileStore(profile)
  }

  return (
    <ProfileStoreContext.Provider value={storeRef.current}>
      {children}
    </ProfileStoreContext.Provider>
  )
}

export const useProfileStore = <T,>(
  selector: (store: ProfileStore) => T,
): T => {
  const profileStoreContext = useContext(ProfileStoreContext)

  if (!profileStoreContext) {
    throw new Error(
      'useProfileStore must be used within a ProfileStoreProvider',
    )
  }

  return useStore(profileStoreContext, selector)
}
