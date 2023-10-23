'use client'
import { PublishingState } from '@prisma/client'
import { PropsWithChildren, createContext, useState, useContext } from 'react'

export type ModerationFilterType = PropsWithChildren & {
  publishingStateFilter: PublishingState
  setPublishingStateFilter?: (filter: PublishingState) => void
}

const initialState: ModerationFilterType = {
  publishingStateFilter: PublishingState.PENDING,
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

  const setPublishingStateFilter = (filter: PublishingState) => {
    setPublishingState(filter)
  }

  return (
    <ModerationFilterContext.Provider
      value={{
        publishingStateFilter: publishingState,
        setPublishingStateFilter,
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
