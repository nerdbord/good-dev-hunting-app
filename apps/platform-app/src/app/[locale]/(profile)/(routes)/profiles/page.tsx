import ProfileList from '@/app/[locale]/(profile)/(components)/ProfileList/ProfileList'
import { type JobOfferFiltersEnum } from '@/app/[locale]/(profile)/profile.types'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { Loader } from '@gdh/ui-system'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async function Profiles({
  searchParams,
}: {
  searchParams: Record<JobOfferFiltersEnum, string>
}) {
  const user = await getAuthorizedUser()

  if (!user.userIsModerator) {
    return notFound()
  }

  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loader></Loader>}>
      <ProfileList />
    </Suspense>
  )
}
