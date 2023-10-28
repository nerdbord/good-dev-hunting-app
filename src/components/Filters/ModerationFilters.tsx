import SearchWrapper from '@/components/ModerationSearchProfile/SearchWrapper'
import Tabs from '@/components/FilterTabs/Tabs'
import styles from './Filters.module.scss'

export default function ModerationFilters() {
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
