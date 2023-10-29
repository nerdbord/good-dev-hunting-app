import { Button } from '../Button/Button'
import { ProfileModel } from '@/data/frontend/profile/types'

import styles from './SearchResultsInfo.module.scss'

interface SearchResultsInfoProps {
  searchEmailValue: string
  filteredData: ProfileModel[]
  clearHandler: () => void
}

export const SearchResultsInfo = ({
  searchEmailValue,
  filteredData,
  clearHandler,
}: SearchResultsInfoProps) => {
  const hasSearchResults = searchEmailValue !== '' && filteredData.length > 0
  const noSearchResults = searchEmailValue !== '' && filteredData.length === 0

  return (
    <>
      {hasSearchResults && (
        <div className={styles.searchInfoCont}>
          <p className={styles.searchInfo}>
            Search results for{' '}
            <span className={styles.searchValue}>
              "{searchEmailValue}" ({filteredData.length})
            </span>
          </p>
          <Button variant="action" onClick={clearHandler}>
            Clear search
          </Button>
        </div>
      )}

      {noSearchResults && (
        <div className={styles.searchEmptyInfoCont}>
          <p className={styles.searchInfo}>
            No search results for{' '}
            <span className={styles.searchValue}>
              "{searchEmailValue}" ({filteredData.length})
            </span>
          </p>
          <Button variant="primary" onClick={clearHandler}>
            Clear search
          </Button>
        </div>
      )}
    </>
  )
}
