'use client'
import { Button } from '@gdh/ui-system'
import { useRef, useState, type ChangeEvent } from 'react'
import { SearchSuggestionItem } from './SearchSuggestionItem'

import { useModerationProfilesStore } from '@/app/[locale]/(moderation)/_providers/moderation-profiles-store.provider'
import { getModerationCurrentState } from '@/app/[locale]/(moderation)/moderation.helpers'
import useOutsideClick from '@/hooks/useOutsideClick'
import styles from './SearchWrapper.module.scss'

export default function SearchWrapper() {
  const [searchValue, setSearchValue] = useState('')
  const { setEmailSearchValue, setActiveTab, moderationProfiles } =
    useModerationProfilesStore(getModerationCurrentState)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionRef = useRef<HTMLUListElement>(null)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const searchHandler = () => {
    if (searchValue === '') return
    setEmailSearchValue(searchValue)
    setActiveTab(null)
    setSearchValue('')
  }

  const handleSuggestionClick = (term: string) => {
    setShowSuggestions(false)
    setEmailSearchValue(term)
    setSearchValue('')
  }

  const filteredProfiles = moderationProfiles.filter((profile) => {
    return searchValue !== '' && profile.email.includes(searchValue)
  })

  useOutsideClick(
    suggestionRef,
    () => setShowSuggestions(false),
    () => setSearchValue(''),
  )

  return (
    <div className={styles.searchWrapper}>
      <input
        name="searchValue"
        className={styles.searchInput}
        placeholder="eg. richard@gmail.com"
        onChange={changeHandler}
        value={searchValue}
        onFocus={() => setShowSuggestions(true)}
      />
      <Button variant={'action'} onClick={searchHandler}>
        Search
      </Button>
      {showSuggestions && filteredProfiles.length > 0 && (
        <ul className={styles.suggestionsBox} ref={suggestionRef}>
          {filteredProfiles.map((profile) => (
            <SearchSuggestionItem
              key={profile.id}
              searchValue={searchValue}
              onClick={handleSuggestionClick}
              profile={profile}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
