'use client'
import {
  createModerationProfilesStore,
  type ModerationProfilesStore,
} from '@/app/[locale]/(moderation)/_stores/moderation-profiles.store'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from 'react'
import { useStore, type StoreApi } from 'zustand'

export const ModerationProfilesStoreContext =
  createContext<StoreApi<ModerationProfilesStore> | null>(null)

export const ModerationProfilesStoreProvider = ({
  children,
  initialProfiles,
}: PropsWithChildren<{ initialProfiles: ProfileModel[] }>) => {
  const storeRef = useRef<StoreApi<ModerationProfilesStore>>()

  if (!storeRef.current) {
    storeRef.current = createModerationProfilesStore(initialProfiles)
  }

  return (
    <ModerationProfilesStoreContext.Provider value={storeRef.current}>
      {children}
    </ModerationProfilesStoreContext.Provider>
  )
}

export const useModerationProfilesStore = <T,>(
  selector: (store: ModerationProfilesStore) => T,
): T => {
  const moderationProfilesStoreContext = useContext(
    ModerationProfilesStoreContext,
  )

  if (!moderationProfilesStoreContext) {
    throw new Error(
      'useProfilesStore must be used within a ProfilesStoreProvider',
    )
  }

  return useStore(moderationProfilesStoreContext, selector)
}
