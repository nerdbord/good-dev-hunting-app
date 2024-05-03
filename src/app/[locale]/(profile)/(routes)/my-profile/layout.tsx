import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import AppHeader from '@/app/[locale]/(profile)/(components)/AppHeader/AppHeader'
import { findProfileByUserId } from '@/app/[locale]/(profile)/_actions'
import { ProfileProvider } from '@/app/[locale]/(profile)/_providers/Profile.provider'
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

  const fetchedProfile = await findProfileByUserId(user.id)

  return (
    <ProfileProvider profile={fetchedProfile}>
      <main>
        <AppHeader />
        <Container>{children}</Container>
      </main>
    </ProfileProvider>
  )
}
