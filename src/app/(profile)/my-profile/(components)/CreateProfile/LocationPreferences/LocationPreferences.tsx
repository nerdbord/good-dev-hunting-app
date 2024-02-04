'use client'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import InputFormError from '@/components/InputFormError/InputFormError'
import SwitchInput from '@/components/Switch/Switch'
import TextInput from '@/components/TextInput/TextInput'
import TextInputWithDropdown from '@/components/TextInputWithDropdown/TextInputWithDropdown'
import { useFormikContext } from 'formik'

import { ProfileFormValues } from '@/app/(profile)/types'
import styles from './LocationPreferences.module.scss'

export enum LocationPreferencesFormKeys {
  COUNTRY = 'country',
  OPEN_FOR_COUNTRY_RELOCATION = 'openForCountryRelocation',
  CITY = 'city',
  OPEN_FOR_CITY_RELOCATION = 'openForCityRelocation',
  REMOTE_ONLY = 'remoteOnly',
}

const LocationPreferences = () => {
  const { values, setFieldValue, handleChange, errors, touched, handleBlur } =
    useFormikContext<ProfileFormValues>()

  const handleToggleCheckbox = (
    value: boolean,
    name: LocationPreferencesFormKeys,
  ) => {
    setFieldValue(name, values[name] ? false : value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Location preferences</div>
        <div className={styles.personalInfo}>
          Share your current qualifications information. You’ll be able to
          change it at any moment.
        </div>
      </div>
      <div className={styles.right}>
        <div>
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
            label="I’m open to residency relocation"
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
        <div>
          <InputFormError
            error={
              touched[LocationPreferencesFormKeys.CITY] &&
              errors[LocationPreferencesFormKeys.CITY]
            }
          >
            <TextInput
              onBlur={handleBlur}
              label="City residency"
              placeholder="Start typing location"
              value={values[LocationPreferencesFormKeys.CITY]}
              onChange={handleChange}
              addImportantIcon={true}
              name={LocationPreferencesFormKeys.CITY}
              excludeDigits
              tooltipText="We use this information to match you with the best job opportunities."
              dataTestId={LocationPreferencesFormKeys.CITY}
              maxLength={40}
            />
          </InputFormError>
          <CheckboxInput
            id={LocationPreferencesFormKeys.OPEN_FOR_CITY_RELOCATION + 1}
            label="I’m open to city relocation"
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
          label="I’m looking for remote jobs only"
          onChange={handleChange}
          name={LocationPreferencesFormKeys.REMOTE_ONLY}
          dataTestId={LocationPreferencesFormKeys.REMOTE_ONLY}
        />
      </div>
    </div>
  )
}

export default LocationPreferences
