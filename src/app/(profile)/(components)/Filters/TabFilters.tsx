'use client'
import { SpecializationTab } from '@/app/(profile)/(components)/Filters/SpecializationsTabs/SpecializationTabs/SpecializationTab'
import { jobSpecializationThemes } from '@/app/(profile)/helpers'
import { type JobSpecialization } from '@/app/(profile)/types'
import { type DropdownOption } from '@/components/Dropdowns/DropdownOptionItem/DropdownOptionItem'
import { createQueryString } from '@/utils/createQueryString'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import styles from './Filters.module.scss'

type TabFiltersProps = {
  specializations: DropdownOption[]
  counts: Record<string, number>
}

export const TabFilters = ({ specializations, counts }: TabFiltersProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = searchParams.get('position')
  const [tab, setTab] = useState(params)

  const handleSpecializationSelect = (option: string | null) => {
    const isAlreadySelected = tab?.toUpperCase() === option?.toUpperCase()

    if (isAlreadySelected || option === null) {
      setTab(null)
      router.push(
        `${pathname}?${createQueryString('position', '', searchParams)}`,
      )
    } else {
      setTab(option)
      router.push(
        `${pathname}?${createQueryString('position', option, searchParams)}`,
      )
    }
  }

  const allTabColors = tab === null ? '#13CBAA' : '#3d434b'
  const countAllProfiles = Object.values(counts).reduce(
    (acc, curr) => acc + curr,
    0,
  )

  return (
    <div className={styles.tabs}>
      <SpecializationTab
        onClick={() => handleSpecializationSelect(null)}
        isPressed={tab === null}
        count={countAllProfiles}
        color={allTabColors}
      >
        All
      </SpecializationTab>
      {specializations.map((spec) => {
        const color = jobSpecializationThemes[spec.value as JobSpecialization]
        return (
          <SpecializationTab
            key={spec.value}
            onClick={() => handleSpecializationSelect(spec.value)}
            isPressed={tab === spec.value}
            count={counts[spec.value] || 0}
            color={color}
          >
            {spec.name}
          </SpecializationTab>
        )
      })}
    </div>
  )
}
