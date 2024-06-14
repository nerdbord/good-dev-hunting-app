'use client'
import {
  approveProfile,
  rejectProfile,
} from '@/app/[locale]/(moderation)/_actions'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { PublishingState } from '@prisma/client'
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

export type ModerationFilterType = PropsWithChildren & {
  publishingStateFilter: PublishingState
  setPublishingStateFilter: (filter: PublishingState) => void
  pendingStateCounter: number
  setPendingStateCounter: (counter: number) => void
  searchEmailValue: string | null
  setEmailSearchValue: (text: string | null) => void
  activeTab: PublishingState | null
  setActiveTab: (value: PublishingState | null) => void
  handleApprove: (profileId: string) => Promise<void>
  handleReject: (profileId: string, reason: string) => Promise<void>
  profiles: ProfileModel[]
}

const ModerationContext = createContext<ModerationFilterType | undefined>(
  undefined,
)

function ModerationProvider({
  children,
  initialProfiles,
}: {
  children: React.ReactNode
  initialProfiles: ProfileModel[]
}) {
  const [publishingState, setPublishingState] = useState<PublishingState>(
    PublishingState.PENDING,
  )
  const [stateCounter, setStateCounter] = useState(0)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<PublishingState | null>(
    PublishingState.PENDING,
  )
  const [profiles, setProfiles] = useState<ProfileModel[]>(initialProfiles)

  const handleApprove = useCallback(
    async (profileId: string) => {
      try {
        const updatedProfile = await approveProfile(profileId)
        const updatedProfiles = profiles.map((profile) =>
          profile.id === updatedProfile.id ? updatedProfile : profile,
        )
        setProfiles(updatedProfiles)
      } catch (err) {
        // handle error
      }
    },
    [profiles],
  )

  const handleReject = useCallback(
    async (profileId: string, reason: string) => {
      try {
        const updatedProfile = await rejectProfile(profileId, reason)
        const updatedProfiles = profiles.map((profile) =>
          profile.id === updatedProfile.id ? updatedProfile : profile,
        )
        setProfiles(updatedProfiles)
      } catch (err) {
        // handle error
      }
    },
    [profiles],
  )

  const setPublishingStateFilter = (filter: PublishingState) => {
    setPublishingState(filter)
  }

  const setPendingStateCounter = (counter: number) => {
    setStateCounter(counter)
  }

  const setEmailSearchValue = (text: string | null) => {
    setSearchValue(text)
  }

  return (
    <ModerationContext.Provider
      value={{
        publishingStateFilter: publishingState,
        setPublishingStateFilter,
        pendingStateCounter: stateCounter,
        setPendingStateCounter,
        searchEmailValue: searchValue,
        setEmailSearchValue,
        handleApprove,
        handleReject,
        activeTab,
        setActiveTab,
        profiles,
      }}
    >
      {children}
    </ModerationContext.Provider>
  )
}

export { ModerationProvider }

export const useModeration = (): ModerationFilterType => {
  const context = useContext(ModerationContext)
  if (!context) {
    throw new Error(
      'useModerationFilter must be used within a ModerationFilterProvider',
    )
  }
  return context
}
