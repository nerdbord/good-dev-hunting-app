import { type JobOfferFiltersEnum } from '@/app/[locale]/(profile)/profile.types'
import { useDebounce } from '@/hooks/useDebounce'
import { I18nNamespaces } from '@/i18n'
import { ClearIcon, SearchIcon } from '@gdh/ui-system/icons'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations(I18nNamespaces.Search)
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
          placeholder={t('searchByName')}
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
