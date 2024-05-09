import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import AppHeader from '@/app/(profile)/(components)/AppHeader/AppHeader'
import { Container } from '@/components/Container/Container'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, userIsHunter } = await getAuthorizedUser()

  if (!user || userIsHunter) {
    redirect(AppRoutes.profilesList)
  }

  return (
    <main>
      <AppHeader />
      <Container>{children}</Container>
    </main>
  )
}
