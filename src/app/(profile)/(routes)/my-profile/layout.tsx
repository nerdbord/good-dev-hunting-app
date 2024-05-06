import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import { findProfileByUserId } from '@/app/(profile)/_actions'
import { ProfileProvider } from '@/app/(profile)/_providers/Profile.provider'
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

  const fetchedProfile = await findProfileByUserId(user.id)

  return (
    <ProfileProvider profile={fetchedProfile}>
      <main>
        <Header />
        <Container>{children}</Container>
      </main>
    </ProfileProvider>
  )
}
