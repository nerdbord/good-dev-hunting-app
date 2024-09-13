import ProfileList from '@/app/[locale]/(profile)/(components)/ProfileList/ProfileList'
import { type JobOfferFiltersEnum } from '@/app/[locale]/(profile)/profile.types'
import { Loader } from '@gdh/ui-system'
import { I18nNamespaces } from '@/i18n'
import { useTranslations } from 'next-intl'
import { Suspense } from 'react'

export default async function Profiles({
  searchParams,
}: {
  searchParams: Record<JobOfferFiltersEnum, string>
}) {
  const t = useTranslations(I18nNamespaces.Index)
  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loader>{t('title')}</Loader>}>
      <ProfileList />
    </Suspense>
  )
}
