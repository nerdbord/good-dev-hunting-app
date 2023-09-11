import React from 'react'
import Filters from '@/components/Filters/Filters'
import DefaultHeader from '@/components/Headers/DefaultHeader/DefaultHeader'
import ProfileList from '@/components/ProfileList/ProfileList'
import { FiltersProvider } from '@/contexts/FilterContext'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <FiltersProvider>
      <DefaultHeader session={session} />
      <Filters />
      {/* @ts-expect-error Server Component */}
      <ProfileList />
    </FiltersProvider>
  )
}
