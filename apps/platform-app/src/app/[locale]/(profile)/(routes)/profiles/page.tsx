import ProfileList from '@/app/[locale]/(profile)/(components)/ProfileList/ProfileList'
import { type JobOfferFiltersEnum } from '@/app/[locale]/(profile)/profile.types'
import { Loader } from '@gdh/ui-system'
import { Suspense } from 'react'

export default async function Profiles({
  searchParams,
}: {
  searchParams: Record<JobOfferFiltersEnum, string>
}) {
  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loader></Loader>}>
      <ProfileList />
    </Suspense>
  )
}
