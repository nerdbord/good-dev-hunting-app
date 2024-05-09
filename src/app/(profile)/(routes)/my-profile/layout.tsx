import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import { Container } from '@/components/Container/Container'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import React from 'react'
import Header from '../../(components)/Header/Header'

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
      <Header />
      <Container>{children}</Container>
    </main>
  )
}
