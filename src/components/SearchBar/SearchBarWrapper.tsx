import { ProfileModel } from '@/app/(profile)/types'
import CloseIcon from '@/assets/icons/CloseIcon'
import SearchIcon from '@/assets/icons/SearchIcon'
import { ChangeEvent, useRef, useState } from 'react'
import styles from './SearchBarWrapper.module.scss'

type Props = {
  profiles: ProfileModel[]
  onSearchChange: (value: string) => void
}

export default function SearchBarWrapper({ profiles, onSearchChange }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionRef = useRef<HTMLUListElement>(null)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    onSearchChange(newValue)
  }

  const clearSearch = () => {
    setSearchValue('')
    onSearchChange('')
  }

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.inputContainer}>
        <input
          name="searchValue"
          className={styles.searchInput}
          placeholder="Search by name"
          onChange={changeHandler}
          value={searchValue}
          onFocus={() => setShowSuggestions(true)}
        />
        {searchValue ? (
          <button onClick={clearSearch} className={styles.clearButton}>
            <CloseIcon />
          </button>
        ) : (
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>
        )}
      </div>
    </div>
  )
}
