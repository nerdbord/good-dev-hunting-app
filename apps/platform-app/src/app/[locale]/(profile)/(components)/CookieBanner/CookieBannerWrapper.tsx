import { cookies } from 'next/headers'
import { CookieBannerClient } from './CookieBannerClient'

export default async function CookieBannerWrapper() {
  const cookieStore = cookies()
  const cookieConsent = (await cookieStore).get('cookie_consent')?.value

  if (cookieConsent) {
    return null
  }

  return <CookieBannerClient />
}
