import ClearIcon from '@/assets/icons/ClearIcon'
import SearchIcon from '@/assets/icons/SearchIcon'
import { useDebounce } from '@/hooks/useDebounce'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import styles from './SearchBarWrapper.module.scss'

type SearchBarWrapperProps = {
  onSearch: (value: string) => void
  value: string
}

export const SearchBarWrapper = ({
  onSearch,
  value,
}: SearchBarWrapperProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchValue, setSearchValue] = useState(value || '')
  const debouncedSearchValue = useDebounce(searchValue, 500)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
  }

  const clearSearch = () => {
    setSearchValue('')
    onSearch('')
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (debouncedSearchValue) {
      onSearch(debouncedSearchValue)
    }
  }, [debouncedSearchValue])

  return (
    <div className={styles.searchWrapper}>
      <input
        ref={inputRef}
        name="searchValue"
        className={styles.searchInput}
        placeholder="Search by name"
        onChange={changeHandler}
        value={searchValue}
      />
      {searchValue ? (
        <button onClick={clearSearch} className={styles.searchBtn}>
          <ClearIcon />
        </button>
      ) : (
        <button onClick={focusInput} className={styles.searchBtn}>
          <SearchIcon />
        </button>
      )}
    </div>
  )
}
