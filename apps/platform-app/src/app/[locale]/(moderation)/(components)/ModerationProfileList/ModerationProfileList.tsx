'use client'
import { ModerationProfileListItem } from '@/app/[locale]/(moderation)/(components)/ModerationProfileList/ModerationProfileListItem'
import { SearchResultsInfo } from '@/app/[locale]/(moderation)/(components)/SearchResultsInfo/SearchResultsInfo'
import { useModerationProfilesStore } from '@/app/[locale]/(moderation)/_providers/moderation-profiles-store.provider'
import { getModerationCurrentState } from '@/app/[locale]/(moderation)/moderation.helpers'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import useTabCounter from '@/hooks/useTabCounter'
import { I18nNamespaces } from '@/i18n/request'
import { Loader } from '@gdh/ui-system'
import { PublishingState } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import styles from './ModerationProfileList.module.scss'

export function ModerationProfileList() {
  const { status } = useSession()
  const {
    publishingState,
    setPendingStateCounter,
    searchValue,
    moderationProfiles,
  } = useModerationProfilesStore(getModerationCurrentState)
  const t = useTranslations(I18nNamespaces.Index)

  const filteredProfiles = moderationProfiles.filter(
    (profile: ProfileModel) => {
      if (searchValue) {
        return profile.email.includes(searchValue)
      }
      return profile.state === publishingState
    },
  )

  const hasResults = filteredProfiles.length > 0

  useTabCounter(
    moderationProfiles,
    PublishingState.PENDING,
    setPendingStateCounter,
  )

  if (status === 'loading') {
    return <Loader>{t('title')}</Loader>
  }

  if (!hasResults) {
    return (
      <div className={styles.noProfiles}>
        <p>No profiles found</p>
      </div>
    )
  }

  return (
    <div className={styles.moderationProfiles}>
      {searchValue &&
        (hasResults ? (
          <SearchResultsInfo
            resultsQty={filteredProfiles.length}
            text="Search results for"
            hasResults
          />
        ) : (
          <SearchResultsInfo text="No search results for" />
        ))}

      <div className={styles.profileListCont}>
        {filteredProfiles.map((profile) => (
          <ModerationProfileListItem key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  )
}
