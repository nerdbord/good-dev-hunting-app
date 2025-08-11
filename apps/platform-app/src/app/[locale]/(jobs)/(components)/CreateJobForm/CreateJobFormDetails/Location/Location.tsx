'use client'

import InputFormError from '@/components/InputFormError/InputFormError'
import TextInput from '@/components/TextInput/TextInput'
import TextInputWithDropdown from '@/components/TextInputWithDropdown/TextInputWithDropdown'
import { I18nNamespaces } from '@/i18n/request'
import { useFormikContext } from 'formik'
import { useTranslations } from 'next-intl'
import { type CreateJobFormValues } from '../../../../_utils/types'
import { Card } from '../Card/Card'
import styles from './Location.module.scss'

export enum LocationFormKeys {
  COUNTRY = 'country',
  CITY = 'city',
}

export const Location = () => {
  const t = useTranslations(I18nNamespaces.LocationPreferences)
  const tt = useTranslations(I18nNamespaces.Jobs)
  const { values, handleChange, errors, touched, handleBlur } =
    useFormikContext<CreateJobFormValues>()

  return (
    <Card>
      <div className={styles.left}>
        <div className={styles.cardHeader}>{t('title')}</div>
        <div className={styles.personalInfo}>{tt('locationDesc')}</div>
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
            tooltipText={tt('locationCityTooltip')}
            dataTestId={LocationFormKeys.CITY}
            maxLength={40}
          />
        </InputFormError>
      </div>
    </Card>
  )
}