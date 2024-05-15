import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'pl']

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    // Tu można zwrócić domyślne tłumaczenia lub pusty obiekt
    return { messages: {} }
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

export enum I18nNamespaces {
  Index = 'Index',
  HowItWorks = 'HowItWorks',
  UserProfile = 'UserProfile',
  TalentSection = 'TalentSection',
  MeetTeam = 'MeetTeam',
  Faq = 'Faq',
  Buttons = 'Buttons',
  LandingFooter = 'LandingFooter',
  DropdownFilter = 'DropdownFilter',
  Search = 'Search',
  LoginDev = 'LoginDev',
  LoginHunter = 'LoginHunter',
  PersonalInfo = 'PersonalInfo',
  LocationPreferences = 'LocationPreferences',
  WorkInformation = 'WorkInformation',
  VerticalCard = 'VerticalCard',
}
