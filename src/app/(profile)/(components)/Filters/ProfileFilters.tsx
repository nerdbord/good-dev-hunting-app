'use client'
import {
  mappedEmploymentType,
  mappedSeniorityLevel,
} from '@/app/(profile)/mappers'
import { JobOfferFiltersEnum } from '@/app/(profile)/types'
import { DropdownFilterMulti } from '@/components/Dropdowns/DropdownFilterMulti/DropdownFilterMulti'
import { type DropdownOption } from '@/components/Dropdowns/DropdownOptionItem/DropdownOptionItem'
import { SearchBarWrapper } from '@/components/SearchBar/SearchBarWrapper'
import { createFiltersObjFromSearchParams } from '@/utils/createFiltersObjFromSearchParams'
import { createQueryString } from '@/utils/createQueryString'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import styles from './Filters.module.scss'

type ProfileFiltersProps = {
  technologies: DropdownOption[]
  countries: DropdownOption[]
}

export const ProfileFilters = ({
  technologies,
  countries,
}: ProfileFiltersProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const filters: Record<JobOfferFiltersEnum, string[]> = useMemo(
    () => createFiltersObjFromSearchParams(searchParams),
    [searchParams],
  )

  const handleFilterChange = (
    filterName: JobOfferFiltersEnum,
    value: string,
  ) => {
    const newFilters = { ...filters }

    if (newFilters[filterName].includes(value)) {
      newFilters[filterName] = newFilters[filterName].filter((v) => v !== value)
    } else {
      newFilters[filterName].push(value)
    }

    const newSearchParams = createQueryString(
      filterName,
      newFilters[filterName].join(','),
      searchParams,
    )

    router.push(`${pathname}?${newSearchParams}`)
  }

  const handleSearchChange = (value: string) => {
    const newSearchParams = createQueryString(
      JobOfferFiltersEnum.search,
      value,
      searchParams,
    )

    router.push(`${pathname}?${newSearchParams}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.features}>
        <DropdownFilterMulti
          text={'Technology'}
          options={technologies}
          jobOfferFilterName={JobOfferFiltersEnum.technology}
          hasSearchInput
          onChange={handleFilterChange}
          value={filters[JobOfferFiltersEnum.technology]}
        />
        <DropdownFilterMulti
          text={'Seniority'}
          options={mappedSeniorityLevel}
          jobOfferFilterName={JobOfferFiltersEnum.seniority}
          onChange={handleFilterChange}
          value={filters[JobOfferFiltersEnum.seniority]}
        />
        <DropdownFilterMulti
          text={'Availability'}
          options={mappedEmploymentType}
          jobOfferFilterName={JobOfferFiltersEnum.availability}
          onChange={handleFilterChange}
          value={filters[JobOfferFiltersEnum.availability]}
        />
        <DropdownFilterMulti
          text={'Location'}
          options={countries}
          jobOfferFilterName={JobOfferFiltersEnum.location}
          onChange={handleFilterChange}
          value={filters[JobOfferFiltersEnum.location]}
        />
      </div>
      <div className={styles.hideOnMobile}>
        <SearchBarWrapper
          onSearch={handleSearchChange}
          value={filters[JobOfferFiltersEnum.search][0]}
        />
      </div>
    </div>
  )
}
