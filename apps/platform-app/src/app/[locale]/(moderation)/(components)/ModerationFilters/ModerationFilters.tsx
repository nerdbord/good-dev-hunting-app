import Tabs from '@/app/[locale]/(moderation)/(components)/FilterTabs/Tabs'
import SearchWrapper from '@/app/[locale]/(moderation)/(components)/ModerationSearchProfile/SearchWrapper'
import styles from './ModerationFilters.module.scss'

export const ModerationFilters = () => {
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
