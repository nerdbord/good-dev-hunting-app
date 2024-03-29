import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import ClearIcon from '@/assets/icons/ClearIcon'
import SearchIcon from '@/assets/icons/SearchIcon'
import { useDebounce } from '@/hooks/useDebounce'
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
  const [searchValue, setSearchValue] = useState(value || '')
  const debouncedSearchValue = useDebounce(searchValue, 500)

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
  }

  useEffect(() => {
    onSearch(jobOfferFilterName, debouncedSearchValue)
  }, [debouncedSearchValue])

  return (
    <>
      <div className={styles.searchWrapper}>
        <input
          ref={inputRef}
          name="searchValue"
          className={styles.searchInput}
          placeholder="Search by name"
          onChange={changeHandler}
          value={searchValue}
        />

        {!searchValue && (
          <button
            tabIndex={0}
            onClick={focusInput}
            className={styles.searchBtn}
          >
            <SearchIcon />
          </button>
        )}

        {searchValue ? (
          <button
            tabIndex={0}
            onClick={clearSearch}
            className={styles.searchBtn}
          >
            <ClearIcon />
          </button>
        ) : null}
      </div>
    </>
  )
}
