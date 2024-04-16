'use client'
import { findAllProfiles } from '@/app/(profile)/_actions'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { PublishingState } from '@prisma/client'
import {
  createContext,
  useContext,
  useEffect,
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
  profiles: ProfileModel[]
}

const ModerationContext = createContext<ModerationFilterType | undefined>(
  undefined,
)

function ModerationProvider({ children }: { children: React.ReactNode }) {
  const [publishingState, setPublishingState] = useState<PublishingState>(
    PublishingState.PENDING,
  )
  const [stateCounter, setStateCounter] = useState(0)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<PublishingState | null>(
    PublishingState.PENDING,
  )
  const [profiles, setProfiles] = useState<ProfileModel[]>([])

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fetchedProfiles = await findAllProfiles()
        setProfiles(fetchedProfiles)
      } catch (err) {
        setProfiles([])
      }
    }

    fetchProfiles()
  }, [])

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
