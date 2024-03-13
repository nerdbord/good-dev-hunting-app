import ProfileList from '@/app/(profile)/(components)/ProfileList/ProfileList'
import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import Loader from '@/components/Loader/Loader'
import { Suspense } from 'react'

export default function PositionPage({
  searchParams,
  params,
}: {
  searchParams: Record<JobOfferFiltersEnum, string>
  params: { position: string }
}) {
  const filters: Record<JobOfferFiltersEnum, string> = {
    ...searchParams,
    position: params.position,
  }

  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loader />}>
      <ProfileList filters={filters} />
    </Suspense>
  )
}
