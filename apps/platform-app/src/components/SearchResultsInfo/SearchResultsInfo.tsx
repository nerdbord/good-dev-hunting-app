import { useModeration } from '@/app/[locale]/(profile)/_providers/Moderation.provider'
import { Button } from '@gdh/ui-system'
import { PublishingState } from '@prisma/client'

import styles from './SearchResultsInfo.module.scss'

interface SearchResultsInfoProps {
  text: string
  resultsQty?: number
  hasResults?: boolean
}

export const SearchResultsInfo = ({
  text,
  resultsQty = 0,
  hasResults,
}: SearchResultsInfoProps) => {
  const { searchEmailValue, setEmailSearchValue, setActiveTab } =
    useModeration()

  const clearHandler = () => {
    setEmailSearchValue(null)
    setActiveTab(PublishingState.PENDING)
  }

  return (
    <>
      <div
        className={
          hasResults ? styles.searchInfoCont : styles.searchEmptyInfoCont
        }
      >
        <p className={styles.searchInfo}>
          {text}{' '}
          <span className={styles.searchValue}>
            "{searchEmailValue}" ({resultsQty})
          </span>
        </p>
        <Button
          variant={hasResults ? 'action' : 'primary'}
          onClick={clearHandler}
        >
          Clear search
        </Button>
      </div>
    </>
  )
}
