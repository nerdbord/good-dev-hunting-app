'use server'
import { withSentry } from '@/utils/errHandling'

export const validateCaptcha = withSentry(async (captchaValue: string) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_HIDDEN_CAPTCHA_KEY}&response=${captchaValue}`
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    })
    const result = await response.json()
    if (result.success) {
      return true
    }
  } catch (error) {
    throw new Error('Captch validation error')
  }
  return false
})
