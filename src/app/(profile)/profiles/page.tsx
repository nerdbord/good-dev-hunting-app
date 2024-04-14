import ProfileList from '@/app/(profile)/(components)/ProfileList/ProfileList'
import { type JobOfferFiltersEnum } from '@/app/(profile)/profile.types'
import Loader from '@/components/Loader/Loader'
import { Suspense } from 'react'

export default async function Profiles({
  searchParams,
}: {
  searchParams: Record<JobOfferFiltersEnum, string>
}) {
  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loader />}>
      <ProfileList />
    </Suspense>
  )
}
