'use client'

import LogOutBtn from '@/app/[locale]/(auth)/(components)/LogOutBtn/LogOutBtn'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import { useWarnIfUnsavedChanges } from '../../../../../hooks/useWarnBeforeLeave/useWarnIfUnsavedChanges'

export default function MyPage() {
  useWarnIfUnsavedChanges(true)

  return (
    <>
      <div>My Page</div>
      <input></input>
      <input></input>
      <Link href={AppRoutes.signOut}>
        <LogOutBtn onClick={() => null} />
      </Link>
      {/* Przykładowe linki */}
      <Link href={AppRoutes.home}>
        <h1>Good Dev Hunting</h1>
      </Link>
      <Link href={AppRoutes.home}>
        <h1>Good Dev Hunting</h1>
      </Link>
    </>
  )
}
