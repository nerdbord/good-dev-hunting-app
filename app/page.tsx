import React from 'react'
import Filters from '@/components/Filters/Filters'
import DefaultHeader from '@/components/Headers/DefaultHeader/DefaultHeader'
import ProfileList from '@/components/ProfileList/ProfileList'
import { FiltersProvider } from '@/contexts/FilterContext'
// nerdy
export default function Home() {
  return (
    <FiltersProvider>
      {/* @ts-expect-error Server Component */}
      <DefaultHeader />
      <Filters />
      {/* @ts-expect-error Server Component */}
      <ProfileList />
    </FiltersProvider>
  )
}
