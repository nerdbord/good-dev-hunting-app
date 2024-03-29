'use client'
import { createFiltersObjFromSearchParams } from '@/app/(profile)/helpers'
import { type SearchParamsFilters } from '@/app/(profile)/types'
import classNames from 'classnames/bind'
import { useSearchParams } from 'next/navigation'
import { useMemo, type PropsWithChildren } from 'react'
import styles from './SpecializationTab.module.scss'

const cx = classNames.bind(styles)

interface SpecializationTabProps {
  name: string
  value: string
  count?: number
  color: string
  onClick?: () => void
}

export const SpecializationTab = ({
  count,
  color,
  onClick,
  name,
  value,
}: PropsWithChildren<SpecializationTabProps>) => {
  const searchParams = useSearchParams()
  const filters: SearchParamsFilters = useMemo(
    () => createFiltersObjFromSearchParams(searchParams),
    [searchParams],
  )

  const isActive = filters?.specialization?.length
    ? filters.specialization[0] === value
    : !filters?.specialization?.length && value === 'All'

  const buttonStyle = isActive ? { borderColor: color, color: color } : {}
  const getSpecializationTabClasses = cx({
    [styles.default]: true,
  })

  return (
    <a
      className={getSpecializationTabClasses}
      style={buttonStyle}
      onClick={onClick}
      role={'button'}
    >
      <div className={styles.content}>
        <span>{name}</span>
        <p>{count !== undefined ? `(${count})` : ''}</p>
      </div>
    </a>
  )
}
