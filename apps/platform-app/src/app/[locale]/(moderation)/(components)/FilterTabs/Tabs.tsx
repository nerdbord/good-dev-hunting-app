'use client'
import { PublishingState } from '@prisma/client'
import Tab from './Tab'

import { useModerationProfilesStore } from '@/app/[locale]/(moderation)/_providers/moderation-profiles-store.provider'
import styles from './Tabs.module.scss'

export const availableTabs: PublishingState[] = Object.values(PublishingState)
  .filter((key) => key !== 'DRAFT')
  .map((key) => PublishingState[key] as PublishingState)

export default function Tabs() {
  const {
    activeTab,
    setPublishingStateFilter,
    setActiveTab,
    setEmailSearchValue,
    stateCounter,
  } = useModerationProfilesStore((state) => state)

  const setModerationFilter = (tab: PublishingState) => {
    setActiveTab(PublishingState[tab])
    setPublishingStateFilter(tab)
    setEmailSearchValue('')
  }

  const nameWithCounter = (counter: number, name: string) =>
    counter > 0 ? `${name} (${counter})` : name

  return (
    <div className={styles.tabsWrapper}>
      {availableTabs.map((tab, index) => {
        return (
          <Tab
            key={index}
            active={tab === activeTab}
            name={
              tab === PublishingState.PENDING
                ? nameWithCounter(stateCounter, tab)
                : tab
            }
            action={() => setModerationFilter(PublishingState[tab])}
            counter={0}
          />
        )
      })}
    </div>
  )
}
