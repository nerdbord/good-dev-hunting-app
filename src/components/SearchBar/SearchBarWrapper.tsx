import { type ProfileModel } from '@/app/(profile)/types'
import ClearIcon from '@/assets/icons/ClearIcon'
import SearchIcon from '@/assets/icons/SearchIcon'
import { useRef, useState, type ChangeEvent } from 'react'
import styles from './SearchBarWrapper.module.scss'

type Props = {
  profiles: ProfileModel[]
  onSearchChange: (value: string) => void
}

export default function SearchBarWrapper({ profiles, onSearchChange }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    onSearchChange(newValue)
  }

  const clearSearch = () => {
    setSearchValue('')
    onSearchChange('')
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          name="searchValue"
          className={styles.searchInput}
          placeholder="Search by name"
          onChange={changeHandler}
          value={searchValue}
        />
        {searchValue ? (
          <button onClick={clearSearch} className={styles.clearButton}>
            <ClearIcon />
          </button>
        ) : (
          <button onClick={focusInput} className={styles.searchIcon}>
            <SearchIcon />
          </button>
        )}
      </div>
    </div>
  )
}
