'use server'

import { setServerCookie } from '@/utils/cookiesHelper'

export async function setCookieConsent(consent: 'granted' | 'denied') {
  await setServerCookie('cookie_consent', consent, 365)
}
