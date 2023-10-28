'use client'
import { PublishingState } from '@prisma/client'
import { PropsWithChildren, createContext, useState, useContext } from 'react'

export type ModerationFilterType = PropsWithChildren & {
  publishingStateFilter: PublishingState
  setPublishingStateFilter?: (filter: PublishingState) => void
  pendingStateCounter: number
  setPendingStateCounter?: (counter: number) => void
}

const initialState: ModerationFilterType = {
  publishingStateFilter: PublishingState.PENDING,
  pendingStateCounter: 0,
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

  const setPublishingStateFilter = (filter: PublishingState) => {
    setPublishingState(filter)
  }

  const setPendingStateCounter = (counter: number) => {
    setStateCounter(counter)
  }

  return (
    <ModerationFilterContext.Provider
      value={{
        publishingStateFilter: publishingState,
        setPublishingStateFilter,
        pendingStateCounter: stateCounter,
        setPendingStateCounter,
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
