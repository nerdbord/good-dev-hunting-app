import Tabs from '@/app/(profile)/(components)/FilterTabs/Tabs'
import SearchWrapper from '@/app/(profile)/(routes)/moderation/(components)/ModerationSearchProfile/SearchWrapper'

import styles from './Filters.module.scss'

export default async function ModerationFilters() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.tabsWrapper}>
        <h2 className={styles.title}>Moderation</h2>
        <Tabs />
      </div>
      <SearchWrapper />
    </div>
  )
}
