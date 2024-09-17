import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { FiltersWithData } from '@/app/[locale]/(profile)/(components)/Filters/FiltersWithData'
import { I18nNamespaces } from '@/i18n'
import { Container, VisitorBanner } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import Header from '../../(components)/Header/Header'

export default async function ProfilesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getAuthorizedUser()
  const t = await getTranslations(I18nNamespaces.Index)
  return (
    <main>
      <Header buttonsVariant="profiles" />
      {!user && <VisitorBanner>{t('visitorBaner')}</VisitorBanner>}
      <Container>
        <FiltersWithData />
        {children}
      </Container>
    </main>
  )
}
