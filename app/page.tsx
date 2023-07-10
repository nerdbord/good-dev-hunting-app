import React from 'react'
import Filters from '@/components/Filters/Filters'
import DefaultHeader from '@/components/Headers/DefaultHeader/DefaultHeader'
import ProfileList from '@/components/ProfileList/ProfileList'

const Home: React.FC = () => {
  return (
    <>
      <DefaultHeader />
      <Filters />
      <ProfileList />
    </>
  )
}

export default Home
