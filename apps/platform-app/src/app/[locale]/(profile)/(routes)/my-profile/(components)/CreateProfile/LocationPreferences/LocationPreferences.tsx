'use client'
import { LanguageInput } from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/LanguageInput/LanguageInput'
import type {
  CreateProfileFormValues,
  DropdownOption,
} from '@/app/[locale]/(profile)/profile.types'
import InputFormError from '@/components/InputFormError/InputFormError'
import SwitchInput from '@/components/Switch/Switch'
import TextInput from '@/components/TextInput/TextInput'
import TextInputWithDropdown from '@/components/TextInputWithDropdown/TextInputWithDropdown'
import { I18nNamespaces } from '@/i18n'
import { CheckboxInput } from '@gdh/ui-system'
import { useFormikContext } from 'formik'
import { useTranslations } from 'next-intl'
import styles from './LocationPreferences.module.scss'

export enum LocationPreferencesFormKeys {
  COUNTRY = 'country',
  OPEN_FOR_COUNTRY_RELOCATION = 'openForCountryRelocation',
  CITY = 'city',
  OPEN_FOR_CITY_RELOCATION = 'openForCityRelocation',
  REMOTE_ONLY = 'remoteOnly',
  LANGUAGE = 'language',
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

  const handleLangSelect = (lang: DropdownOption) => {
    const languageArray = Array.isArray(
      values[LocationPreferencesFormKeys.LANGUAGE],
    )
      ? values[LocationPreferencesFormKeys.LANGUAGE]
      : []
    if (!languageArray.includes(lang)) {
      setFieldValue(LocationPreferencesFormKeys.LANGUAGE, [
        ...languageArray,
        lang,
      ])
    }
  }

  const handleLangRemove = (langToRemove: DropdownOption) => {
    const languageArray = Array.isArray(
      values[LocationPreferencesFormKeys.LANGUAGE],
    )
      ? values[LocationPreferencesFormKeys.LANGUAGE]
      : []
    setFieldValue(
      LocationPreferencesFormKeys.LANGUAGE,
      languageArray.filter((lang) => lang.value !== langToRemove.value),
    )
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
        <InputFormError
          error={
            touched[LocationPreferencesFormKeys.LANGUAGE] &&
            ((errors[LocationPreferencesFormKeys.LANGUAGE] as string) || '')
          }
        >
          <LanguageInput
            chips={values[LocationPreferencesFormKeys.LANGUAGE]}
            label={t('languages')}
            placeholder={t('languagePlaceholder')}
            name={LocationPreferencesFormKeys.LANGUAGE}
            onTechSelect={handleLangSelect}
            onTechRemove={handleLangRemove}
            addImportantIcon={true}
            tooltipText={t('languageTooltip')}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
          />
        </InputFormError>
      </div>
    </div>
  )
}

export default LocationPreferences
