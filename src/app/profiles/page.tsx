import React from 'react'
import Filters from '@/components/Filters/Filters'
import ProfileList from '@/components/ProfileList/ProfileList'
import { FiltersProvider } from '@/contexts/FilterContext'

export default function Home() {
  return (
    <FiltersProvider>
      <Filters />
      <ProfileList />
    </FiltersProvider>
  )
}
