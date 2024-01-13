import React from 'react'
import Filters from '@/components/Filters/Filters'
import ProfileList from '@/components/ProfileList/ProfileList'
import { FiltersProvider } from '@/contexts/FilterContext'
import FAQ from '@/components/LandingPage/FAQ/FAQ'

export default function Home() {
  return (
    <FiltersProvider>
      {/* <Filters /> */}
      {/* <ProfileList /> */}
      <FAQ />
    </FiltersProvider>
  )
}
