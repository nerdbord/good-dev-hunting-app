import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { Container } from '@/components/Container/Container'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import React from 'react'
import Header from '../../(components)/Header/Header'
import { ProfileStoreProvider } from '@/app/[locale]/(profile)/_providers/profile-store.provider'
import { findProfileByUserId } from '@/app/[locale]/(profile)/_actions'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, userIsHunter } = await getAuthorizedUser()

  if (!user || userIsHunter) {
    redirect(AppRoutes.profilesList)
  }

  const profile = await findProfileByUserId(user.id)

  if (!profile) {
    redirect(AppRoutes.createProfile)
  }

  return (
    <ProfileStoreProvider profile={profile}>
      <main>
        <Header />
        <Container>{children}</Container>
      </main>
    </ProfileStoreProvider>
  )
}
