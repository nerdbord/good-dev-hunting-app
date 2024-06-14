'use client'
import { type PublishingState } from '@prisma/client'
import { type PropsWithChildren } from 'react'
import styles from './tabs.module.scss'

type TabProps = {
  name: string
  active?: boolean
  counter: number
  action?: () => void
}

function counterFormat(counter: number): string {
  return counter > 0 ? ` (${counter})` : ' '
}

export function formatStateName(name: string | PublishingState): string {
  const nameToLower = name.toLowerCase()
  return (
    nameToLower.toLowerCase().charAt(0).toUpperCase() + nameToLower.slice(1)
  )
}

export default function Tab({
  name,
  active,
  action,
  counter,
}: PropsWithChildren<TabProps>) {
  return (
    <button
      className={`${styles.tab} ${active ? styles.active : ''}`}
      onClick={action}
    >
      {formatStateName(name)}
      {counterFormat(counter)}
    </button>
  )
}
