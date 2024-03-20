import ProfileList from '@/app/(profile)/(components)/ProfileList/ProfileList'
import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import Loader from '@/components/Loader/Loader'
import { Suspense } from 'react'

export default async function SpecializationPage({
  searchParams,
  params,
}: {
  searchParams: Record<JobOfferFiltersEnum, string>
  params: { specialization: string }
}) {
  const filters = {
    ...searchParams,
    specialization: params.specialization,
  }

  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loader />}>
      <ProfileList filters={filters} />
    </Suspense>
  )
}
