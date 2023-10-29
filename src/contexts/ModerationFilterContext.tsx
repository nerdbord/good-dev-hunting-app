'use client'
import { PropsWithChildren, createContext, useState, useContext } from 'react'
import { PublishingState } from '@prisma/client'

export type ModerationFilterType = PropsWithChildren & {
  publishingStateFilter: PublishingState
  setPublishingStateFilter?: (filter: PublishingState) => void
  pendingStateCounter: number
  setPendingStateCounter?: (counter: number) => void
  searchEmailValue: string
  setEmailSearchValue?: (text: string) => void
  activeTab: PublishingState | null
  setActiveTab?: (value: PublishingState | null) => void
}

const initialState: ModerationFilterType = {
  publishingStateFilter: PublishingState.PENDING,
  pendingStateCounter: 0,
  searchEmailValue: '',
  activeTab: PublishingState.PENDING,
}

const ModerationFilterContext =
  createContext<ModerationFilterType>(initialState)

function ModerationFilterContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [publishingState, setPublishingState] = useState<PublishingState>(
    initialState.publishingStateFilter,
  )
  const [stateCounter, setStateCounter] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [activeTab, setActiveTab] = useState<PublishingState | null>(
    initialState.activeTab,
  )

  const setPublishingStateFilter = (filter: PublishingState) => {
    setPublishingState(filter)
  }

  const setPendingStateCounter = (counter: number) => {
    setStateCounter(counter)
  }

  const setEmailSearchValue = (text: string) => {
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
