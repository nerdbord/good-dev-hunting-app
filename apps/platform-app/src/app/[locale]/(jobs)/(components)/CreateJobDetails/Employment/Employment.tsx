'use client'
import { I18nNamespaces } from '@/i18n/request'
import { CheckboxInput } from '@gdh/ui-system'
import { EmploymentType } from '@prisma/client'
import { useTranslations } from 'next-intl'

// import InputFormError from '@/components/InputFormError/InputFormError'
import { type CreateJobDetailsFormValues } from '@/app/[locale]/(jobs)/jobDetailsTypes'
import { useFormikContext } from 'formik'
import styles from './Employment.module.scss'

export enum EmploymentFormKeys {
  CONTRACT_TYPE = 'contractType',
  EMPLOYMENT_TYPE = 'employmentType',
  EMPLOYMENT_MODE = 'employmentMode',
  COUNTRY = 'country',
  CITY = 'city',
}
export const Employment = () => {
  const t = useTranslations(I18nNamespaces.WorkInformation)

  const { values, setFieldValue } =
    useFormikContext<CreateJobDetailsFormValues>()
  //     Forma zatrudnienia
  // - Umowa: B2B / Umowa o pracę / Umowa o dzieło / Umowa Zlecenie
  // - Czas zatrudnienia: Pełny etat / Pół etatu / Kontrakt
  // - Wybierz tryb pracy: Stacjonarny / Hybrydowy / Zdalny
  // - Wybierz lokalizacje kandydatów: Kraje / Miasta

  const handleEmploymentType = (option: EmploymentType): void => {
    let newFilters: string[]
    if (values.employmentType.includes(option)) {
      newFilters = values.employmentType.filter(
        (selectedOption) => selectedOption !== option,
      )
    } else {
      newFilters = [...values.employmentType, option]
    }
    setFieldValue(EmploymentFormKeys.EMPLOYMENT_TYPE, newFilters)
  }

  const isEmploymentTypeSelected = (option: EmploymentType): boolean => {
    return values.employmentType.includes(option)
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Forma zatrudnienia</div>
        <div className={styles.personalInfo}>
          Ustal forme zatrudnienia, rodzaj umowy, tryb pracy i lokalizacje
          kandydatów
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.employmentType}>
          {t('employerType')}{' '}
          <CheckboxInput
            id={EmploymentFormKeys.CONTRACT_TYPE + 1}
            label={t('employFull')}
            checked={isEmploymentTypeSelected(EmploymentType.FULL_TIME)}
            onChange={() => handleEmploymentType(EmploymentType.FULL_TIME)}
            name={EmploymentFormKeys.CONTRACT_TYPE}
          />
          <CheckboxInput
            id={EmploymentFormKeys.CONTRACT_TYPE + 2}
            label={t('employPart')}
            checked={isEmploymentTypeSelected(EmploymentType.PART_TIME)}
            onChange={() => handleEmploymentType(EmploymentType.PART_TIME)}
            name={EmploymentFormKeys.CONTRACT_TYPE}
          />
          <CheckboxInput
            id={EmploymentFormKeys.CONTRACT_TYPE + 3}
            label={t('employContract')}
            checked={isEmploymentTypeSelected(EmploymentType.CONTRACT)}
            onChange={() => handleEmploymentType(EmploymentType.CONTRACT)}
            name={EmploymentFormKeys.CONTRACT_TYPE}
          />
        </div>
      </div>
    </div>
  )
}
