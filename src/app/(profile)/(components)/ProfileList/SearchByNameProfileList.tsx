'use client'
import { ProfileModel } from '@/app/(profile)/types'
import { getAllPublishedProfilesPayload } from '@/backend/profile/profile.service'
import SearchByNameWrapper from '@/components/SearchBar/SearchBarWrapper'
import { useEffect, useState } from 'react'
import SearchByNameProfilesWithFilter from './SearchByNameProfilesWithFilter'

export default function SearchByNameProfilesList() {
  const [searchValue, setSearchValue] = useState('')
  const [profiles, setProfiles] = useState<ProfileModel[]>([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const loadedProfiles = await getAllPublishedProfilesPayload()
      setProfiles(loadedProfiles)
    }

    fetchProfiles()
  }, [])

  const filteredProfiles = profiles.filter((profile) =>
    profile.fullName.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <>
      <SearchByNameWrapper
        profiles={profiles}
        onSearchChange={setSearchValue}
      />
      <SearchByNameProfilesWithFilter profiles={filteredProfiles} />
    </>
  )
}
