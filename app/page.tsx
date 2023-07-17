import React from 'react'
import Filters from '@/components/Filters/Filters'
import DefaultHeader from '@/components/Headers/DefaultHeader/DefaultHeader'
import ProfileList from '@/components/ProfileList/ProfileList'
import { FiltersProvider } from '@/contexts/FilterContext'

const Home: React.FC = () => {
  return (
    <FiltersProvider>
      <DefaultHeader />
      <Filters />
      <ProfileList />
    </FiltersProvider>
  )
}

export default Home