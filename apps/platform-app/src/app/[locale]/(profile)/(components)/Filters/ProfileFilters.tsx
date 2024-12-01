'use client'
import {
  createFiltersObjFromSearchParams,
  createQueryString,
} from '@/app/[locale]/(profile)/profile.helpers'
import {
  mappedEmploymentType,
  mappedSeniorityLevel,
} from '@/app/[locale]/(profile)/profile.mappers'
import {
  JobOfferFiltersEnum,
  type SearchParamsFilters,
} from '@/app/[locale]/(profile)/profile.types'
import { DropdownFilterMulti } from '@/components/Dropdowns/DropdownFilterMulti/DropdownFilterMulti'
import { SearchBarWrapper } from '@/components/SearchBar/SearchBarWrapper'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { I18nNamespaces } from '@/i18n/request'
import { type DropdownOption } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations(I18nNamespaces.DropdownFilter)

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery()

  const filters: SearchParamsFilters = useMemo(
    () => createFiltersObjFromSearchParams(searchParams),
    [searchParams],
  )

  const handleFilterChange = (
    filterName: JobOfferFiltersEnum,
    value: string,
  ) => {
    const newSearchParams = createQueryString(filterName, value, searchParams)
    //
    router.replace(`${pathname}?${newSearchParams}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.features}>
        <DropdownFilterMulti
          text={t('technology')}
          options={technologies}
          jobOfferFilterName={JobOfferFiltersEnum.technology}
          hasSearchInput
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.technology]}
        />
        <DropdownFilterMulti
          text={t('seniority')}
          options={mappedSeniorityLevel}
          jobOfferFilterName={JobOfferFiltersEnum.seniority}
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.seniority]}
        />
        <DropdownFilterMulti
          text={t('availability')}
          options={mappedEmploymentType}
          jobOfferFilterName={JobOfferFiltersEnum.availability}
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.availability]}
        />
        <DropdownFilterMulti
          text={t('location')}
          options={countries}
          jobOfferFilterName={JobOfferFiltersEnum.location}
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.location]}
        />

        {/* SALARY FILTER TEMPORARILY DISABLED */
        /* <DropdownFilterMulti
          text={t('salary')}
          options={hourlyRateOptions}
          jobOfferFilterName={JobOfferFiltersEnum.salary}
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.salary]}
        /> */}
      </div>
      {!isMobile && (
        <SearchBarWrapper
          jobOfferFilterName={JobOfferFiltersEnum.search}
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.search][0]}
        />
      )}
    </div>
  )
}
