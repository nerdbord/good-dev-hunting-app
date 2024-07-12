import {
  approveProfile,
  rejectProfile,
} from '@/app/[locale]/(moderation)/_actions'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { PublishingState } from '@prisma/client'
import { createStore } from 'zustand'

export type ModerationProfilesState = {
  moderationProfiles: ProfileModel[]
  moderationProfile: ProfileModel | null
  publishingState: PublishingState
  stateCounter: number
  searchValue: string | null
  activeTab: PublishingState | null
}

export type ModerationProfilesActions = {
  setModerationProfile(profileId: string): void
  approveModerationProfile(profileId: string): Promise<void>
  rejectModerationProfile(profileId: string, reasonText: string): Promise<void>
  setPublishingStateFilter(filter: PublishingState): void
  setPendingStateCounter(counter: number): void
  setEmailSearchValue(text: string | null): void
  setActiveTab(tab: PublishingState | null): void
  resetModerationProfile(): void
}

export type ModerationProfilesStore = ModerationProfilesState &
  ModerationProfilesActions

export const createModerationProfilesStore = (initState: ProfileModel[]) => {
  return createStore<ModerationProfilesStore>()((set) => ({
    moderationProfiles: initState,
    moderationProfile: null,
    publishingState: PublishingState.PENDING,
    stateCounter: 0,
    searchValue: null,
    activeTab: PublishingState.PENDING,
    setModerationProfile: (profileId) => {
      set((state) => {
        const moderationProfile = state.moderationProfiles.find(
          (p) => p.id === profileId,
        )

        if (!moderationProfile) return state

        return { ...state, moderationProfile }
      })
    },
    approveModerationProfile: async (profileId: string) => {
      await approveProfile(profileId)

      set((state) => {
        const profile = state.moderationProfiles.find((p) => p.id === profileId)

        if (!profile) return state

        profile.state = PublishingState.APPROVED

        return state
      })
    },
    rejectModerationProfile: async (profileId: string, reasonText: string) => {
      await rejectProfile(profileId, reasonText)

      set((state) => {
        const profile = state.moderationProfiles.find((p) => p.id === profileId)

        if (!profile) return state

        profile.state = PublishingState.REJECTED

        return state
      })
    },
    setPublishingStateFilter: (filter) => {
      set({ publishingState: filter })
    },
    setPendingStateCounter: (counter) => {
      set({ stateCounter: counter })
    },
    setEmailSearchValue: (text) => {
      set({ searchValue: text })
    },
    setActiveTab: (tab) => {
      set({ activeTab: tab })
    },
    resetModerationProfile: () => {
      set({ moderationProfile: null })
    },
  }))
}
