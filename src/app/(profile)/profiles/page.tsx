import { FiltersWithData } from '@/app/(profile)/(components)/Filters/FiltersWithData'
import ProfileList from '@/app/(profile)/(components)/ProfileList/ProfileList'
import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import Loader from '@/components/Loader/Loader'
import { Suspense } from 'react'

export default function Home({
  searchParams,
}: {
  searchParams: Record<JobOfferFiltersEnum, string>
}) {
  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loader />}>
      <FiltersWithData filters={searchParams} />
      <ProfileList filters={searchParams} />
    </Suspense>
  )
}
