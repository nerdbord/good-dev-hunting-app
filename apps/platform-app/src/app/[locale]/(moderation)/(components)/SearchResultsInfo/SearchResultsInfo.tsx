import { useModerationProfilesStore } from '@/app/[locale]/(moderation)/_providers/moderation-profiles-store.provider'
import { Button } from '@gdh/ui-system'
import { PublishingState } from '@prisma/client'

import { getModerationCurrentState } from '@/app/[locale]/(moderation)/moderation.helpers'
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
  const { searchValue, setEmailSearchValue, setActiveTab } =
    useModerationProfilesStore(getModerationCurrentState)

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
            "{searchValue}" ({resultsQty})
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
