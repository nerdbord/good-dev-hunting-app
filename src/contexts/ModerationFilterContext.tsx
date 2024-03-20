'use client'
import { PublishingState } from '@prisma/client'
import {
  createContext,
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
}

const ModerationFilterContext = createContext<ModerationFilterType | undefined>(
  undefined,
)

function ModerationFilterContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [publishingState, setPublishingState] = useState<PublishingState>(
    PublishingState.PENDING,
  )
  const [stateCounter, setStateCounter] = useState(0)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<PublishingState | null>(
    PublishingState.PENDING,
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
    <ModerationFilterContext.Provider
      value={{
        publishingStateFilter: publishingState,
        setPublishingStateFilter,
        pendingStateCounter: stateCounter,
        setPendingStateCounter,
        searchEmailValue: searchValue,
        setEmailSearchValue,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </ModerationFilterContext.Provider>
  )
}

export { ModerationFilterContext, ModerationFilterContextProvider }

export const useModerationFilter = (): ModerationFilterType => {
  const context = useContext(ModerationFilterContext)
  if (!context) {
    throw new Error(
      'useModerationFilter must be used within a ModerationFilterProvider',
    )
  }
  return context
}
