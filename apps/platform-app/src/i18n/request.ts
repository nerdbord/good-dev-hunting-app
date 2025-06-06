import { routing } from '@/i18n/routing'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment.
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})

export enum I18nNamespaces {
  LocaleSwitcher = 'LocaleSwitcher',
  Index = 'Index',
  HowItWorks = 'HowItWorks',
  UserProfile = 'UserProfile',
  TalentSection = 'TalentSection',
  MeetTeam = 'MeetTeam',
  HunterTeam = 'HunterTeam',
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
  ConfirmLeaveModal = 'ConfirmLeaveModal',
  ConfirmLogoutModal = 'ConfirmLogoutModal',
  VerificationModal = 'VerificationModal',
  Jobs = 'Jobs',
  Hunter = 'Hunter',
  Applications = 'Applications',
  AddJobChat = 'AddJobChat',
  MyJobCard = 'MyJobCard',
  Inbox = 'Inbox',
  Auth = 'Auth',
  HunterFAQ = 'HunterFAQ',
  HunterFooter = 'HunterFooter',
  HunterWhyWorth = 'HunterWhyWorth',
  HunterHeader = 'HunterHeader',
  HunterRiskReducers = 'HunterRiskReducers',
  HunterReviews = 'HunterReviews',
  HunterHero = 'HunterHero',
  HunterCTA = 'HunterCTA',
  AddJobVerificationModal = 'AddJobVerificationModal',
  AddJobSuccessModal = 'AddJobSuccessModal',
  AddJobErrorModal = 'AddJobErrorModal',
  HunterHowItWorks = 'HunterHowItWorks',
  Metadata = 'Metadata',
}
