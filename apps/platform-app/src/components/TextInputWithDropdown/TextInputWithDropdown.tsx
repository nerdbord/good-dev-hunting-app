'use client'
import { LocationPreferencesFormKeys } from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfile/LocationPreferences/LocationPreferences'
import { type ProfileFormValues } from '@/app/[locale]/(profile)/profile.types'
import DropdownCountry from '@/components/Dropdowns/DropdownCountry/DropdownCountry'
import TextInput, {
  type TextInputProps,
} from '@/components/TextInput/TextInput'
import { getCountryName } from '@/data/countries'
import useOutsideClick from '@/hooks/useOutsideClick'
import { I18nNamespaces } from '@/i18n/request'
import { useFormikContext } from 'formik'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import styles from './TextInputWithDropdown.module.scss'

const TextInputWithDropdown = ({ onBlur }: TextInputProps) => {
  const t = useTranslations(I18nNamespaces.LocationPreferences)
  const locale = useLocale()
  const { values, setFieldValue } = useFormikContext<ProfileFormValues>()

  const [displayedValue, setDisplayedValue] = useState('')
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Effect to initialize displayedValue based on Formik's value (name_en) and current locale
  useEffect(() => {
    const initialCountryEnName = values[LocationPreferencesFormKeys.COUNTRY]
    if (initialCountryEnName) {
      setDisplayedValue(getCountryName(initialCountryEnName, locale))
    } else {
      setDisplayedValue('')
    }
  }, [values[LocationPreferencesFormKeys.COUNTRY], locale])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentInput = event.target.value
    setDisplayedValue(currentInput)
    if (currentInput.length > 0 && !isDropdownActive) {
      setIsDropdownActive(true)
    } else if (currentInput.length === 0) {
      setIsDropdownActive(false)
    }
    setFieldValue(LocationPreferencesFormKeys.COUNTRY, '')
  }

  const handleCountrySelect = (selectedCountry: string) => {
    setDisplayedValue(getCountryName(selectedCountry, locale))
    setFieldValue(LocationPreferencesFormKeys.COUNTRY, selectedCountry)
    setIsDropdownActive(false)
  }

  const handleInputClick = () => {
    if (displayedValue.length > 0 || isDropdownActive) {
      setIsDropdownActive(!isDropdownActive)
    } else {
      setIsDropdownActive(true)
    }
  }

  const handleBlurAndClear = () => {
    if (!values[LocationPreferencesFormKeys.COUNTRY]) {
      setDisplayedValue('')
    }
    setIsDropdownActive(false)
  }

  useOutsideClick(dropdownRef, handleBlurAndClear)

  return (
    <div className={styles.container}>
      <TextInput
        onBlur={onBlur}
        label={t('residence')}
        placeholder={t('residencePlaceholder')}
        value={displayedValue}
        onChange={handleInputChange}
        excludeDigits
        onClick={handleInputClick}
        autoComplete={'off'}
      />
      {isDropdownActive && (
        <div ref={dropdownRef}>
          <DropdownCountry
            inputValue={displayedValue}
            locale={locale}
            onCountrySelect={handleCountrySelect}
            setIsDropdownActive={setIsDropdownActive}
          />
        </div>
      )}
    </div>
  )
}

export default TextInputWithDropdown
