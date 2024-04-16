import AppHeader from '@/app/(profile)/(components)/AppHeader/AppHeader'
import { findProfileByGithubUsername } from '@/app/(profile)/_actions'
import { ProfileProvider } from '@/app/(profile)/_providers/Profile.provider'
import { Container } from '@/components/Container/Container'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    username: string
  }
}) {
  const profile = await findProfileByGithubUsername(params.username)
  if (!profile) {
    redirect(AppRoutes.profilesList)
  }

  return (
    <ProfileProvider userId={profile.userId}>
      <AppHeader />
      <Container>{children}</Container>
    </ProfileProvider>
  )
}
