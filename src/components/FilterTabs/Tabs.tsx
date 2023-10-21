'use client'
import { useState } from 'react'
import Tab from './Tab'
import styles from './tabs.module.scss'
import { PublishingState } from '@prisma/client'

export const availableTabs: PublishingState[] = Object.values(PublishingState)
  .filter((key) => key !== 'DRAFT')
  .map((key) => PublishingState[key] as PublishingState)

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<PublishingState>(
    PublishingState.PENDING,
  )

  return (
    <div className={styles.tabsWrapper}>
      {availableTabs.map((tab, index) => {
        return (
          <Tab
            key={index}
            active={tab === activeTab}
            name={tab}
            action={() => setActiveTab(PublishingState[tab])}
            counter={0}
          />
        )
      })}
    </div>
  )
}
