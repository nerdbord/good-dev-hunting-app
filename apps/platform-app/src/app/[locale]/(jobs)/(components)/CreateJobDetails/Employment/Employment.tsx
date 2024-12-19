'use client'
import { I18nNamespaces } from '@/i18n/request'
import { CheckboxInput } from '@gdh/ui-system'
import { EmploymentType } from '@prisma/client'
import { useTranslations } from 'next-intl'

import {
  EmploymentMode,
  type CreateJobDetailsFormValues,
} from '@/app/[locale]/(jobs)/jobDetailsTypes'
import { DropdownSelect } from '@/components/Dropdowns/DropdownBio/DropdownSelect'
import InputFormError from '@/components/InputFormError/InputFormError'
import { useFormikContext } from 'formik'
import { mappedJobContractType } from '../../../jobDetails.mappers'
import styles from './Employment.module.scss'

export enum EmploymentFormKeys {
  CONTRACT_TYPE = 'contractType',
  EMPLOYMENT_TYPE = 'employmentType',
  EMPLOYMENT_MODE = 'employmentMode',
}
export const Employment = () => {
  const t = useTranslations(I18nNamespaces.WorkInformation)
  const tt = useTranslations(I18nNamespaces.Jobs)

  const { values, setFieldValue, touched, errors } =
    useFormikContext<CreateJobDetailsFormValues>()
  //     Forma zatrudnienia
  // - Umowa: B2B / Umowa o pracę / Umowa o dzieło / Umowa Zlecenie

  // - Czas zatrudnienia: Pełny etat / Pół etatu / Kontrakt
  // - Wybierz tryb pracy: Stacjonarny / Hybrydowy / Zdalny
  // Select work mode: Stationary / Hybrid / Remote

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

  const handleEmploymentMode = (option: EmploymentMode): void => {
    let newFilters: string[]
    if (values.employmentMode.includes(option)) {
      newFilters = values.employmentMode.filter(
        (selectedOption) => selectedOption !== option,
      )
    } else {
      newFilters = [...values.employmentMode, option]
    }
    setFieldValue(EmploymentFormKeys.EMPLOYMENT_MODE, newFilters)
  }

  const isEmploymentModeSelected = (option: EmploymentMode): boolean => {
    return values.employmentMode.includes(option)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>{t('title')}</div>
        <div className={styles.personalInfo}>{tt('emplo')}</div>
      </div>

      <div className={styles.right}>
        <InputFormError
          error={
            touched[EmploymentFormKeys.CONTRACT_TYPE] &&
            errors[EmploymentFormKeys.CONTRACT_TYPE]?.value
          }
        >
          <DropdownSelect
            id={EmploymentFormKeys.CONTRACT_TYPE}
            label={tt('contractTypeLabel')}
            text={tt('contractTypeDesc')}
            options={mappedJobContractType}
            selectedValue={values[EmploymentFormKeys.CONTRACT_TYPE]}
            name={EmploymentFormKeys.CONTRACT_TYPE}
          />
        </InputFormError>
        <div className={styles.employmentType}>
          {tt('employmentType')}{' '}
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
        <div className={styles.employmentType}>
          {tt('workMode')}
          <CheckboxInput
            id={EmploymentFormKeys.EMPLOYMENT_MODE + 1}
            label={tt('workModeStationary')}
            checked={isEmploymentModeSelected(EmploymentMode.STATIONARY)}
            onChange={() => handleEmploymentMode(EmploymentMode.STATIONARY)}
            name={EmploymentFormKeys.EMPLOYMENT_MODE}
          />
          <CheckboxInput
            id={EmploymentFormKeys.EMPLOYMENT_MODE + 2}
            label={tt('workModeHybrid')}
            checked={isEmploymentModeSelected(EmploymentMode.HYBRID)}
            onChange={() => handleEmploymentMode(EmploymentMode.HYBRID)}
            name={EmploymentFormKeys.EMPLOYMENT_MODE}
          />
          <CheckboxInput
            id={EmploymentFormKeys.EMPLOYMENT_MODE + 3}
            label={tt('workModeRemote')}
            checked={isEmploymentModeSelected(EmploymentMode.REMOTE)}
            onChange={() => handleEmploymentMode(EmploymentMode.REMOTE)}
            name={EmploymentFormKeys.EMPLOYMENT_MODE}
          />
        </div>
      </div>
    </div>
  )
}
