import Tabs from '@/app/(profile)/(components)/FilterTabs/Tabs'
import SearchWrapper from '@/app/(profile)/moderation/(components)/ModerationSearchProfile/SearchWrapper'

import { findAllPublishedProfiles } from '@/app/(profile)/_actions/findAllPublishedProfiles'
import styles from './Filters.module.scss'

export default async function ModerationFilters() {
  const profiles = await findAllPublishedProfiles()

  return (
    <div className={styles.mainContainer}>
      <div className={styles.tabsWrapper}>
        <h2 className={styles.title}>Moderation</h2>
        <Tabs />
      </div>
      <SearchWrapper profiles={profiles} />
    </div>
  )
}
