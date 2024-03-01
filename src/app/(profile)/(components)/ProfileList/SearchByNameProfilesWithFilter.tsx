'use client'
import { ProfileModel } from '@/app/(profile)/types'
import { useState } from 'react'
import styles from './ProfileList.module.scss'
import { SearchByNameProfileListItem } from './SearchByNameProfileListItem'

type Props = {
  profiles: ProfileModel[]
}

export default function SearchByNameProfilesWithFilter({
  profiles = [],
}: Props) {
  const [searchValue, setSearchValue] = useState('')

  const filteredProfiles = profiles.filter((profile: ProfileModel) => {
    return profile.fullName.toLowerCase().includes(searchValue.toLowerCase())
  })

  const hasResults = filteredProfiles.length > 0

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={styles.moderationProfiles}>
      <input
        type="text"
        placeholder="Search by name"
        value={searchValue}
        onChange={handleSearchChange}
      />
      {hasResults ? (
        filteredProfiles.map((profile) => (
          <SearchByNameProfileListItem key={profile.id} profile={profile} />
        ))
      ) : (
        <p>No profiles found</p>
      )}
    </div>
  )
}
