'use client'

import { type ReactNode } from "react"


type LocaleSwitcherSelectProps = {
  children: ReactNode
  defaultValue: string
  label: string
}
export const LocaleSwitcherSelect = ({
  children,
  defaultValue,
  label,
}: LocaleSwitcherSelectProps) => {
  console.log("CHILDREN: ", children)
  console.log("DEFAULT: ", defaultValue)
  console.log("LABEL: ", label)
  return (
    <label className=''>
      <p className="sr-only">{label}</p>
      <select defaultValue={defaultValue}>{children}</select>
    </label>
  )
}
