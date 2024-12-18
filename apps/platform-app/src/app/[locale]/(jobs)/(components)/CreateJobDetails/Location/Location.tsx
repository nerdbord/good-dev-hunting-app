'use client'

import InputFormError from '@/components/InputFormError/InputFormError'
import TextInput from '@/components/TextInput/TextInput'
import TextInputWithDropdown from '@/components/TextInputWithDropdown/TextInputWithDropdown'
import { I18nNamespaces } from '@/i18n/request'
import { useFormikContext } from 'formik'
import { useTranslations } from 'next-intl'
import { type CreateJobDetailsFormValues } from '../../../jobDetailsTypes'
import styles from './Location.module.scss'
import { Switch } from '@gdh/ui-system'

export enum LocationFormKeys {
  COUNTRY = 'country',
  CITY = 'city',
  REMOTE_ONLY = 'remoteOnly',
}

// - Wybierz lokalizacje kandydatów: Kraje / Miasta
// - Ustal lokalizacje kandydatów: Kraje / Miasta

export const Location = () => {
  const t = useTranslations(I18nNamespaces.LocationPreferences)
  const { values, handleChange, errors, touched, handleBlur } =
    useFormikContext<CreateJobDetailsFormValues>()
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>{t('title')}</div>
        <div className={styles.personalInfo}>Ustal lokalizacje kandydatów.</div>
      </div>
      <div className={styles.right}>
        <InputFormError
          error={
            touched[LocationFormKeys.COUNTRY] &&
            errors[LocationFormKeys.COUNTRY]
          }
        >
          <TextInputWithDropdown
            onChange={handleChange}
            name={LocationFormKeys.COUNTRY}
            onBlur={handleBlur}
          />
        </InputFormError>
        <InputFormError
          error={
            touched[LocationFormKeys.CITY] && errors[LocationFormKeys.CITY]
          }
        >
          <TextInput
            onBlur={handleBlur}
            label={t('city')}
            placeholder={t('cityPlaceholder')}
            value={values[LocationFormKeys.CITY]}
            onChange={handleChange}
            addImportantIcon={true}
            name={LocationFormKeys.CITY}
            excludeDigits
            tooltipText={t('cityTooltip')}
            dataTestId={LocationFormKeys.CITY}
            maxLength={40}
          />
        </InputFormError>
        <Switch
          id={LocationFormKeys.REMOTE_ONLY + 2}
          checked={values[LocationFormKeys.REMOTE_ONLY]}
          label={t('remontOnly')}
          onChange={handleChange}
          name={LocationFormKeys.REMOTE_ONLY}
          dataTestId={LocationFormKeys.REMOTE_ONLY}
        />
      </div>
    </div>
  )
}
