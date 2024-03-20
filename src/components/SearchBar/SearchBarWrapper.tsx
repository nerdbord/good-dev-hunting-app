import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import ClearIcon from '@/assets/icons/ClearIcon'
import SearchIcon from '@/assets/icons/SearchIcon'
import { useDebounce } from '@/hooks/useDebounce'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import styles from './SearchBarWrapper.module.scss'

type SearchBarWrapperProps = {
  onSearch: (filterName: JobOfferFiltersEnum, value: string) => void
  value: string
  jobOfferFilterName: JobOfferFiltersEnum
}

export const SearchBarWrapper = ({
  onSearch,
  value,
  jobOfferFilterName,
}: SearchBarWrapperProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = useState(value || '')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const isMobile = useMediaQuery()
  const [isFocused, setIsFocused] = useState(false)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
  }

  const clearSearch = () => {
    setSearchValue('')
    onSearch(jobOfferFilterName, '')
    focusInput()
  }

  const focusInput = () => {
    inputRef.current?.focus()
    setIsFocused(true)
  }

  useOutsideClick(searchRef, () => setIsFocused(false))

  useEffect(() => {
    onSearch(jobOfferFilterName, debouncedSearchValue)
  }, [debouncedSearchValue])

  return (
    <div className={styles.searchWrapper} ref={searchRef}>
      <input
        ref={inputRef}
        name="searchValue"
        className={styles.searchInput}
        placeholder="Search by name"
        onChange={changeHandler}
        value={searchValue}
      />
      {((isMobile && isFocused) || !isMobile) && searchValue ? (
        <button tabIndex={0} onClick={clearSearch} className={styles.searchBtn}>
          <ClearIcon />
        </button>
      ) : (
        <button tabIndex={0} onClick={focusInput} className={styles.searchBtn}>
          <SearchIcon />
        </button>
      )}
    </div>
  )
}
