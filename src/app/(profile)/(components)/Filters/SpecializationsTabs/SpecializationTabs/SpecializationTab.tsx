'use client'
import { jobSpecializationThemes } from '@/app/(profile)/helpers'
import { JobSpecialization } from '@/app/(profile)/types'
import classNames from 'classnames/bind'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import styles from './SpecializationTab.module.scss'

const cx = classNames.bind(styles)

interface SpecializationTabProps {
  count?: number
  name: string
}

export const SpecializationTab = ({
  children,
  count,
  name,
}: PropsWithChildren<SpecializationTabProps>) => {
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

  const isPressed = tab?.toUpperCase() === name.toUpperCase()

  const handleClick = (option: string) => {
    // const isAlreadySelected = tab.find(
    //   (o) => o.value === option,
    // )
    console.log(option)
    if (isPressed) {
      setTab(null)
    } else {
      setTab(option)
    }
  }

  useEffect(() => {
    if (tab) {
      console.log('przekierowanie')
      router.push(`${pathname}?${createQueryString('position', tab)}`)
    } else {
      router.push(`${pathname}?${createQueryString('position', '')}`)
    }
  }, [tab])

  const color = jobSpecializationThemes[name as JobSpecialization]
  const buttonStyle = isPressed ? { borderColor: color, color: color } : {}
  const getSpecializationTabClasses = cx({
    [styles.default]: true,
  })

  console.log('tab', tab)

  return (
    <div
      className={getSpecializationTabClasses}
      onClick={() => handleClick(name)}
      style={buttonStyle}
    >
      <div className={styles.content}>
        <span>{children}</span>
        <p>{count !== undefined ? `(${count})` : ''}</p>
      </div>
    </div>
  )
}
