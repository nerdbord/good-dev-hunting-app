'use client'
import { SpecializationTab } from '@/app/(profile)/(components)/Filters/SpecializationsTabs/SpecializationTabs/SpecializationTab'
import { jobSpecializationThemes } from '@/app/(profile)/helpers'
import { mappedSpecialization } from '@/app/(profile)/mappers'
import { JobSpecialization } from '@/app/(profile)/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import styles from './Filters.module.scss'

export const TabFilters = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = searchParams.get('position')
  const [tab, setTab] = useState(params)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value === '') {
        params.delete(name)
      } else if (params.has(name)) {
        params.set(name, value)
      } else {
        params.append(name, value)
      }

      return params.toString().replaceAll('%2C', ',')
    },
    [searchParams],
  )
  const handleSpecializationSelect = (option: string | null) => {
    const isAlreadySelected = tab?.toUpperCase() === option?.toUpperCase()

    if (isAlreadySelected) {
      setTab(null)
    } else {
      setTab(option)
    }
  }

  const allTabColors = tab === null ? '#13CBAA' : '#3d434b'

  useEffect(() => {
    if (tab) {
      router.push(`${pathname}?${createQueryString('position', tab)}`)
    } else {
      router.push(`${pathname}?${createQueryString('position', '')}`)
    }
  }, [tab])

  return (
    <div className={styles.tabs}>
      <SpecializationTab
        onClick={() => handleSpecializationSelect(null)}
        isPressed={tab === null}
        // count={filteredProfilesCount}
        color={allTabColors}
      >
        All
      </SpecializationTab>
      {mappedSpecialization.map((spec) => {
        const color = jobSpecializationThemes[spec.value as JobSpecialization]
        return (
          <SpecializationTab
            key={spec.value}
            onClick={() => handleSpecializationSelect(spec.value)}
            isPressed={tab === spec.value}
            // count={specializationCounts[spec.value] || 0}
            color={color}
          >
            {spec.name}
          </SpecializationTab>
        )
      })}
    </div>
  )
}
