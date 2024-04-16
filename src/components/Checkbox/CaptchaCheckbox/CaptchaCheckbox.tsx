import { validateCaptcha } from '@/app/(profile)/_actions/mutations/validateCaptcha'
import { ToastStatus, useToast } from '@/contexts/ToastContext'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import CheckboxInput from '../Checkbox'
import styles from '../Checkbox.module.scss'

export type CaptchaCheckboxProps = {
  name: string
  id: string
  label: string
  onChange: (
    field: string,
    value: boolean,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<any>
  checked: boolean
}

export default function CaptchaCheckbox(props: CaptchaCheckboxProps) {
  const { addToast } = useToast()
  // not sure if this is the proper way to handle such case
  const captchaRef = useRef<ReCAPTCHA>(null)
  const [verificationComplete, setVerificationComplete] = useState(false)
  const handleChange = () => {
    if (captchaRef.current && !verificationComplete) {
      captchaRef.current.execute()
    }
  }

  const handleCaptchaChange = async (value: string | null) => {
    if (!process.env.NEXT_PUBLIC_HIDDEN_CAPTCHA_SITE_KEY) {
      addToast('Captcha site key is not set', ToastStatus.HIDDEN)
      return
    }
    if (value) {
      try {
        const captchaResult = await validateCaptcha(value)
        captchaResult && props.onChange(props.name, true)
      } catch (error) {
        addToast(JSON.stringify(error), ToastStatus.HIDDEN)
      }
    }
    setVerificationComplete(true)
  }

  return (
    <div className={styles.captchaContainer}>
      <CheckboxInput
        id={props.id}
        label={props.label}
        checked={props.checked}
        onChange={handleChange}
        name={props.name}
      ></CheckboxInput>
      <ReCAPTCHA
        badge="inline"
        size="invisible"
        theme="dark"
        className={styles.captcha}
        sitekey={process.env.NEXT_PUBLIC_HIDDEN_CAPTCHA_SITE_KEY || ''}
        ref={captchaRef}
        onChange={handleCaptchaChange}
      ></ReCAPTCHA>
    </div>
  )
}
