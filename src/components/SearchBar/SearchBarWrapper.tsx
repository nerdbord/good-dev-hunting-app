'use client'
import ClearIcon from '@/assets/icons/ClearIcon'
import SearchIcon from '@/assets/icons/SearchIcon'
import { useDebounce } from '@/hooks/useDebounce'
import { createQueryString } from '@/utils/createQueryString'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import styles from './SearchBarWrapper.module.scss'

export const SearchBarWrapper = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = searchParams.get('search')
  const [searchValue, setSearchValue] = useState(params || '')
  const debouncedSearchValue = useDebounce(searchValue, 500)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
  }

  const clearSearch = () => {
    setSearchValue('')
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (debouncedSearchValue) {
      router.push(
        `${pathname}?${createQueryString(
          'search',
          debouncedSearchValue,
          searchParams,
        )}`,
      )
    } else {
      router.push(
        `${pathname}?${createQueryString('search', '', searchParams)}`,
      )
    }
  }, [debouncedSearchValue, router])

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
