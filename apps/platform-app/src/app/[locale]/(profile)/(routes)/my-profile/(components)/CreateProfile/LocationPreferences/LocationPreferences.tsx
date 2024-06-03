'use client'
import {CheckboxInput} from '@gdh/ui-system'
import InputFormError from '@/components/InputFormError/InputFormError'
import SwitchInput from '@/components/Switch/Switch'
import TextInput from '@/components/TextInput/TextInput'
import TextInputWithDropdown from '@/components/TextInputWithDropdown/TextInputWithDropdown'
import { useFormikContext } from 'formik'

import { type CreateProfileFormValues } from '@/app/[locale]/(profile)/profile.types'
import { I18nNamespaces } from '@/i18n'
import { useTranslations } from 'next-intl'
import styles from './LocationPreferences.module.scss'

export enum LocationPreferencesFormKeys {
  COUNTRY = 'country',
  OPEN_FOR_COUNTRY_RELOCATION = 'openForCountryRelocation',
  CITY = 'city',
  OPEN_FOR_CITY_RELOCATION = 'openForCityRelocation',
  REMOTE_ONLY = 'remoteOnly',
}

const LocationPreferences = () => {
  const t = useTranslations(I18nNamespaces.LocationPreferences)
  const { values, setFieldValue, handleChange, errors, touched, handleBlur } =
    useFormikContext<CreateProfileFormValues>()

  const handleToggleCheckbox = (
    value: boolean,
    name: LocationPreferencesFormKeys,
  ) => {
    setFieldValue(name, values[name] ? false : value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>{t('title')}</div>
        <div className={styles.personalInfo}>{t('description')}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.checkboxContainer}>
          <InputFormError
            error={
              touched[LocationPreferencesFormKeys.COUNTRY] &&
              errors[LocationPreferencesFormKeys.COUNTRY]
            }
          >
            <TextInputWithDropdown
              onChange={handleChange}
              name={LocationPreferencesFormKeys.COUNTRY}
              onBlur={handleBlur}
            />
          </InputFormError>
          <CheckboxInput
            onBlur={handleBlur}
            id={LocationPreferencesFormKeys.OPEN_FOR_COUNTRY_RELOCATION}
            label={t('relocationOpen')}
            checked={
              values[LocationPreferencesFormKeys.OPEN_FOR_COUNTRY_RELOCATION]
            }
            onChange={() => {
              handleToggleCheckbox(
                true,
                LocationPreferencesFormKeys.OPEN_FOR_COUNTRY_RELOCATION,
              )
            }}
            name={LocationPreferencesFormKeys.OPEN_FOR_COUNTRY_RELOCATION}
            dataTestId={LocationPreferencesFormKeys.OPEN_FOR_COUNTRY_RELOCATION}
          />
        </div>
        <div className={styles.checkboxContainer}>
          <InputFormError
            error={
              touched[LocationPreferencesFormKeys.CITY] &&
              errors[LocationPreferencesFormKeys.CITY]
            }
          >
            <TextInput
              onBlur={handleBlur}
              label={t('city')}
              placeholder={t('cityPlaceholder')}
              value={values[LocationPreferencesFormKeys.CITY]}
              onChange={handleChange}
              addImportantIcon={true}
              name={LocationPreferencesFormKeys.CITY}
              excludeDigits
              tooltipText={t('cityTooltip')}
              dataTestId={LocationPreferencesFormKeys.CITY}
              maxLength={40}
            />
          </InputFormError>
          <CheckboxInput
            id={LocationPreferencesFormKeys.OPEN_FOR_CITY_RELOCATION + 1}
            label={t('cityRelocation')}
            checked={
              values[LocationPreferencesFormKeys.OPEN_FOR_CITY_RELOCATION]
            }
            onChange={() => {
              handleToggleCheckbox(
                true,
                LocationPreferencesFormKeys.OPEN_FOR_CITY_RELOCATION,
              )
            }}
            name={LocationPreferencesFormKeys.OPEN_FOR_CITY_RELOCATION}
            dataTestId={LocationPreferencesFormKeys.OPEN_FOR_CITY_RELOCATION}
          />
        </div>
        <SwitchInput
          id={LocationPreferencesFormKeys.REMOTE_ONLY + 2}
          checked={values[LocationPreferencesFormKeys.REMOTE_ONLY]}
          label={t('remontOnly')}
          onChange={handleChange}
          name={LocationPreferencesFormKeys.REMOTE_ONLY}
          dataTestId={LocationPreferencesFormKeys.REMOTE_ONLY}
        />
      </div>
    </div>
  )
}

export default LocationPreferences
