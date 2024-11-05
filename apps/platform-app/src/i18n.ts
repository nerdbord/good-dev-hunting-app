import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation';
import { locales, type Locale } from "./i18n.config";


export default getRequestConfig(async ({ locale }) => {
  // if (!locales.includes(locale)) {
  //   // Tu można zwrócić domyślne tłumaczenia lub pusty obiekt
  //   return { messages: {} }
  // }
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

export enum I18nNamespaces {
  LocaleSwitcher = 'LocaleSwitcher',
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
  ConfirmLeaveModal = 'ConfirmLeaveModal',
  ConfirmLogoutModal = 'ConfirmLogoutModal',
}
