'use client'
import { SpecializationTab } from '@/app/(profile)/(components)/Filters/SpecializationsTabs/SpecializationTabs/SpecializationTab'
import { countProfilesForPositions } from '@/app/(profile)/_actions/countProfiles'
import { jobSpecializationThemes } from '@/app/(profile)/helpers'
import {
  type JobOfferFiltersEnum,
  type JobSpecialization,
} from '@/app/(profile)/types'
import { type DropdownOption } from '@/components/Dropdowns/DropdownOptionItem/DropdownOptionItem'
import { createFiltersObjFromSearchParams } from '@/utils/createFiltersObjFromSearchParams'
import { AppRoutes } from '@/utils/routes'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './Filters.module.scss'

type TabFiltersProps = {
  specializations: DropdownOption[]
}

export const TabFilters = ({ specializations }: TabFiltersProps) => {
  const searchParams = useSearchParams()
  const filters: Record<JobOfferFiltersEnum, string[]> = useMemo(
    () => createFiltersObjFromSearchParams(searchParams),
    [searchParams],
  )

  const [numberOfProfiles, setNumberOfProfiles] = useState<Record<
    string,
    number
  > | null>(null)

  const countAllProfiles =
    numberOfProfiles &&
    Object.values(numberOfProfiles).reduce((acc, curr) => acc + curr, 0)

  useEffect(() => {
    const countProfiles = async () => {
      const counts = await countProfilesForPositions(filters)

      setNumberOfProfiles(counts)
    }

    countProfiles()
  }, [searchParams])

  return (
    <div className={styles.tabs}>
      <SpecializationTab
        count={countAllProfiles || 0}
        color={'#13CBAA'}
        href={`${AppRoutes.profiles}?${new URLSearchParams(
          searchParams.toString(),
        )
          .toString()
          .replaceAll('%2C', ',')}`}
      >
        All
      </SpecializationTab>
      {specializations.map((spec) => {
        const color = jobSpecializationThemes[spec.value as JobSpecialization]
        return (
          <SpecializationTab
            key={spec.value}
            count={numberOfProfiles?.[spec.value] || 0}
            color={color}
            href={`${AppRoutes.profiles}/${spec.value}?${new URLSearchParams(
              searchParams.toString(),
            )
              .toString()
              .replaceAll('%2C', ',')}`}
          >
            {spec.name}
          </SpecializationTab>
        )
      })}
    </div>
  )
}
