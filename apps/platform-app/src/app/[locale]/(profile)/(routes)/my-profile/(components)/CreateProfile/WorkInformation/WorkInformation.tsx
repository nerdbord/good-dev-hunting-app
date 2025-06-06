'use client'
import {
  hourlyRateOptions,
  mappedSeniorityLevel,
  mappedSpecialization,
} from '@/app/[locale]/(profile)/profile.mappers'
import { DropdownSelect } from '@/components/Dropdowns/DropdownBio/DropdownSelect'
import { Button, CheckboxInput } from '@gdh/ui-system'

import InputFormError from '@/components/InputFormError/InputFormError'
import { TechStackInput } from '@/components/TechStackInput/TechStackInput'
import { Currency, EmploymentType } from '@prisma/client'
import { useFormikContext } from 'formik'

import { currencyButtonTextDisplay } from '@/app/[locale]/(profile)/profile.mappers'
import { type CreateProfileFormValues } from '@/app/[locale]/(profile)/profile.types'
import { I18nNamespaces } from '@/i18n/request'
import { type DropdownOption } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import styles from './WorkInformations.module.scss'

export enum WorkInformationFormKeys {
  POSITION = 'position',
  SENIORITY = 'seniority',
  TECH_STACK = 'techStack',
  EMPLOYMENT = 'employment',
  CURRENCY = 'currency',
  HOURLY_RATE_MIN = 'hourlyRateMin',
  HOURLY_RATE_MAX = 'hourlyRateMax',
  HOURLY_RATE = 'hourlyRate',
}

const WorkInformation = () => {
  const t = useTranslations(I18nNamespaces.WorkInformation)

  const { values, errors, setFieldValue, touched } =
    useFormikContext<CreateProfileFormValues>()

  const handleEmploymentType = (option: EmploymentType): void => {
    let newFilters: string[]
    if (values.employment.includes(option)) {
      newFilters = values.employment.filter(
        (selectedOption) => selectedOption !== option,
      )
    } else {
      newFilters = [...values.employment, option]
    }
    setFieldValue(WorkInformationFormKeys.EMPLOYMENT, newFilters)
  }

  const handleTechSelect = (tech: DropdownOption) => {
    if (!values[WorkInformationFormKeys.TECH_STACK].includes(tech)) {
      setFieldValue(WorkInformationFormKeys.TECH_STACK, [
        ...values[WorkInformationFormKeys.TECH_STACK],
        tech,
      ])
    }
  }

  const handleTechRemove = (techToRemove: DropdownOption) => {
    if (Array.isArray(values[WorkInformationFormKeys.TECH_STACK])) {
      setFieldValue(
        WorkInformationFormKeys.TECH_STACK,
        values[WorkInformationFormKeys.TECH_STACK].filter(
          (tech) => tech.value !== techToRemove.value,
        ),
      )
    }
  }
  const handleCurrencyChange = (chosenCurrency: Currency) => {
    setFieldValue(WorkInformationFormKeys.CURRENCY, chosenCurrency)
  }

  const isEmploymentTypeSelected = (option: EmploymentType): boolean => {
    return values.employment.includes(option)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>{t('title')}</div>
        <div className={styles.personalInfo}>{t('description')}</div>
      </div>

      <div className={styles.right}>
        <InputFormError
          error={
            touched[WorkInformationFormKeys.POSITION] &&
            errors[WorkInformationFormKeys.POSITION]?.value
          }
        >
          <DropdownSelect
            id={WorkInformationFormKeys.POSITION}
            label={t('specialization')}
            text={t('specializationText')}
            options={mappedSpecialization}
            selectedValue={values[WorkInformationFormKeys.POSITION]}
            name={WorkInformationFormKeys.POSITION}
          />
        </InputFormError>

        <InputFormError
          error={
            touched[WorkInformationFormKeys.SENIORITY] &&
            errors[WorkInformationFormKeys.SENIORITY]?.value
          }
        >
          <DropdownSelect
            id={WorkInformationFormKeys.SENIORITY}
            label={t('seniority')}
            text={t('seniorityText')}
            options={mappedSeniorityLevel}
            selectedValue={values[WorkInformationFormKeys.SENIORITY]}
            name={WorkInformationFormKeys.SENIORITY}
          />
        </InputFormError>
        <InputFormError
          error={
            touched[WorkInformationFormKeys.CURRENCY] &&
            errors[WorkInformationFormKeys.CURRENCY]
          }
        >
          <div className={styles.currencyButtonsContainer}>
            {Object.keys(Currency).map((value, index) => {
              if (value === values.currency) {
                return (
                  <Button variant="secondary" key={index}>
                    {currencyButtonTextDisplay(value as Currency)}
                  </Button>
                )
              }
              return (
                <Button
                  variant="grayedOut"
                  onClick={() => {
                    return handleCurrencyChange(value as Currency)
                  }}
                  key={index}
                >
                  {currencyButtonTextDisplay(value as Currency)}
                </Button>
              )
            })}
          </div>
        </InputFormError>
        <DropdownSelect
          id={WorkInformationFormKeys.HOURLY_RATE}
          label={t('hourlyRate')}
          text={t('chooseHourlyRate')}
          options={hourlyRateOptions(values.currency)}
          selectedValue={
            hourlyRateOptions(values.currency).find(
              (option) =>
                option.value ===
                `${values[WorkInformationFormKeys.HOURLY_RATE_MIN]}-${
                  values[WorkInformationFormKeys.HOURLY_RATE_MAX]
                }`,
            ) || { name: '', value: '' }
          }
          name={WorkInformationFormKeys.HOURLY_RATE}
        />
        <InputFormError
          error={
            touched[WorkInformationFormKeys.TECH_STACK] &&
            ((errors[WorkInformationFormKeys.TECH_STACK] as string) || '')
          }
        >
          <TechStackInput
            chips={values[WorkInformationFormKeys.TECH_STACK]}
            label={t('techstack')}
            placeholder={t('startTyping')}
            name={WorkInformationFormKeys.TECH_STACK}
            onTechSelect={handleTechSelect}
            onTechRemove={handleTechRemove}
            addImportantIcon={true}
            tooltipText={t('techstackTooltip')}
          />
        </InputFormError>
        <div className={styles.addInfo}>
          {t('techstackInfo')} <br />
          {t('techstackChoose')}
        </div>
        <div className={styles.employmentType}>
          {t('employerType')}{' '}
          <CheckboxInput
            id={WorkInformationFormKeys.EMPLOYMENT + 1}
            label={t('employFull')}
            checked={isEmploymentTypeSelected(EmploymentType.FULL_TIME)}
            onChange={() => handleEmploymentType(EmploymentType.FULL_TIME)}
            name={WorkInformationFormKeys.EMPLOYMENT}
          />
          <CheckboxInput
            id={WorkInformationFormKeys.EMPLOYMENT + 2}
            label={t('employPart')}
            checked={isEmploymentTypeSelected(EmploymentType.PART_TIME)}
            onChange={() => handleEmploymentType(EmploymentType.PART_TIME)}
            name={WorkInformationFormKeys.EMPLOYMENT}
          />
          <CheckboxInput
            id={WorkInformationFormKeys.EMPLOYMENT + 3}
            label={t('employContract')}
            checked={isEmploymentTypeSelected(EmploymentType.CONTRACT)}
            onChange={() => handleEmploymentType(EmploymentType.CONTRACT)}
            name={WorkInformationFormKeys.EMPLOYMENT}
          />
        </div>
      </div>
    </div>
  )
}

export default WorkInformation
