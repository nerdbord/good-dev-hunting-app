import { Button } from '../Button/Button'
import { ProfileModel } from '@/data/frontend/profile/types'

import styles from './SearchResultsInfo.module.scss'

interface SearchResultsInfoProps {
  searchEmailValue: string
  profiles: ProfileModel[]
  clearHandler: () => void
}

export const SearchResultsInfo = ({
  searchEmailValue,
  profiles,
  clearHandler,
}: SearchResultsInfoProps) => {
  const isSearchActive = searchEmailValue !== ''

  return (
    <>
      {isSearchActive &&
        (profiles.length > 0 ? (
          <div className={styles.searchInfoCont}>
            <p className={styles.searchInfo}>
              Search results for{' '}
              <span className={styles.searchValue}>
                "{searchEmailValue}" ({profiles.length})
              </span>
            </p>
            <Button variant="action" onClick={clearHandler}>
              Clear search
            </Button>
          </div>
        ) : (
          <div className={styles.searchEmptyInfoCont}>
            <p className={styles.searchInfo}>
              No search results for{' '}
              <span className={styles.searchValue}>
                "{searchEmailValue}" ({profiles.length})
              </span>
            </p>
            <Button variant="primary" onClick={clearHandler}>
              Clear search
            </Button>
          </div>
        ))}
    </>
  )
}
