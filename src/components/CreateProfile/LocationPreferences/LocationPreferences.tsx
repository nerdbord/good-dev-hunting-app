import { useFormikContext } from 'formik'
import { CreateProfileFormValues } from '@/components/CreateProfileForm/CreateProfileFormWrapper'
import InputFormError from '@/components/InputFormError/InputFormError'
import TextInputWithDropdown from '@/components/TextInputWithDropdown/TextInputWithDropdown'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import TextInput from '@/components/TextInput/TextInput'
import SwitchInput from '@/components/Switch/Switch'

import styles from './LocationPreferences.module.scss'

export enum LocationPreferencesFormKeys {
  COUNTRY = 'country',
  OPEN_TO_RELOCATION_COUNTRY = 'openToRelocationCountry',
  CITY = 'city',
  OPEN_TO_RELOCATION_CITY = 'openToRelocationCity',
  REMOTE_ONLY = 'remoteOnly',
}

const LocationPreferences = () => {
  const { values, handleChange, errors, touched, handleBlur } =
    useFormikContext<CreateProfileFormValues>()

  return (
    <div className={styles.container}>
      [...]
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
            id={LocationPreferencesFormKeys.OPEN_TO_RELOCATION_COUNTRY}
            label="I’m open to residency relocation"
            checked={
              values[LocationPreferencesFormKeys.OPEN_TO_RELOCATION_COUNTRY]
            }
            onChange={handleChange}
            name={LocationPreferencesFormKeys.OPEN_TO_RELOCATION_COUNTRY}
            dataTestId={LocationPreferencesFormKeys.OPEN_TO_RELOCATION_COUNTRY}
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
            id={LocationPreferencesFormKeys.OPEN_TO_RELOCATION_CITY}
            label="I’m open to city relocation"
            checked={
              values[LocationPreferencesFormKeys.OPEN_TO_RELOCATION_CITY]
            }
            onChange={handleChange}
            name={LocationPreferencesFormKeys.OPEN_TO_RELOCATION_CITY}
            dataTestId={LocationPreferencesFormKeys.OPEN_TO_RELOCATION_CITY}
          />
        </div>
        <SwitchInput
          id={LocationPreferencesFormKeys.REMOTE_ONLY}
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
