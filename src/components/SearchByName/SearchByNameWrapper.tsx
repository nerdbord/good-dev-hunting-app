import { SearchSuggestionItem } from '@/app/(profile)/moderation/(components)/ModerationSearchProfile/SearchSuggestionItem'
import { ProfileModel } from '@/app/(profile)/types'
import { Button } from '@/components/Button/Button'
import useOutsideClick from '@/hooks/useOutsideClick'
import { ChangeEvent, useRef, useState } from 'react'
import styles from './SearchByNameWrapper.module.scss'

type Props = {
  profiles: ProfileModel[]
  onSearchChange: (value: string) => void
}

export default function SearchByNameWrapper({
  profiles,
  onSearchChange,
}: Props) {
  const [searchValue, setSearchValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionRef = useRef<HTMLUListElement>(null)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    onSearchChange(newValue)
    console.log('Zaktualizowana wartość wyszukiwania:', e.target.value)
  }

  const searchHandler = () => {
    if (searchValue === '') return
    setSearchValue('')
  }

  const handleSuggestionClick = (fullName: string) => {
    setShowSuggestions(false)
    setSearchValue('')
  }

  console.log('Lista profili przed filtrowaniem:', profiles)
  const filteredProfiles = profiles.filter((profile: ProfileModel) => {
    return (
      searchValue !== '' &&
      profile.fullName.toLowerCase().includes(searchValue.toLowerCase())
    )
  })
  console.log('Wyfiltrowane profile:', filteredProfiles)

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
        placeholder="Search by name"
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
