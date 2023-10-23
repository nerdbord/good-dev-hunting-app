'use client'
import { useState } from 'react'
import Tab from './Tab'
import styles from './tabs.module.scss'
import { PublishingState } from '@prisma/client'
import { useModerationFilter } from '@/contexts/ModerationFilterContext'

export const availableTabs: PublishingState[] = Object.values(PublishingState)
  .filter((key) => key !== 'DRAFT')
  .map((key) => PublishingState[key] as PublishingState)

export default function Tabs() {
  const { setPublishingStateFilter } = useModerationFilter()
  const [activeTab, setActiveTab] = useState<PublishingState>(
    PublishingState.PENDING,
  )

  const setModerationFilter = (tab: PublishingState) => {
    setActiveTab(PublishingState[tab])
    setPublishingStateFilter && setPublishingStateFilter(tab)
  }

  return (
    <div className={styles.tabsWrapper}>
      {availableTabs.map((tab, index) => {
        return (
          <Tab
            key={index}
            active={tab === activeTab}
            name={tab}
            action={() => setModerationFilter(PublishingState[tab])}
            counter={0}
          />
        )
      })}
    </div>
  )
}
