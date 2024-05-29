import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { Container } from '@/components/Container/Container'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import React from 'react'
import Header from '../../(components)/Header/Header'
import { findProfileByUserId } from '@/app/[locale]/(profile)/_actions'
import { MyProfileLayout } from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/MyProfileLayout/MyProfileLayout'

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
    <MyProfileLayout profileId={profile.id}>
      <Header />
      <Container>{children}</Container>
    </MyProfileLayout>
  )
}
