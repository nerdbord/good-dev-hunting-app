'use client'
import styles from '@/app/[locale]/(profile)/(routes)/my-profile/create/page.module.scss'
import { Button } from '@gdh/ui-system'
import { Currency, PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { type CreateJobDetailsFormValues } from '../../jobDetailsTypes'
import { BasicInfo } from '../CreateJobDetails/BasicInfo/BasicInfo'
import { Budget } from '../CreateJobDetails/Budget/Budget'
import { Employment } from '../CreateJobDetails/Employment/Employment'
import { Location } from '../CreateJobDetails/Location/Location'
import { useTranslations } from 'next-intl'
import { I18nNamespaces } from '@/i18n/request'

const initialValues: CreateJobDetailsFormValues = {
  jobName: '',
  projectBrief: '',
  techStack: [],
  currency: Currency.PLN,
  minBudgetForProjectRealisation: null,
  maxBudgetForProjectRealisation: null,
  contractType: { name: '', value: '' },
  employmentType: [],
  employmentMode: [],
  country: '',
  city: '',
  remoteOnly: false,
  terms: false,
  state: PublishingState.DRAFT,
}
// Informacje podstawowe
// - Nazwa zlecenia
// - Brief projektowy
// - Technologie
// Budżet
// - Waluta
// - Minimalna kwota za realizacje projektu
// - Maksymalna kwota za realizacje projektu
// Forma zatrudnienia
// - ContractType Umowa: B2B / Umowa o pracę / Umowa o dzieło / Umowa Zlecenie
// - EmploymentType Czas zatrudnienia: Pełny etat / Pół etatu / Kontrakt
// - EmploymentMode Wybierz tryb pracy: Stacjonarny / Hybrydowy / Zdalny
// - LocationCountries LocationCities Wybierz lokalizacje kandydatów: Kraje / Miasta

const validationSchema = Yup.object().shape({
  jobName: Yup.string().required('Job name is required'),
  projectBrief: Yup.string().required('Project brief is required'),
  techStack: Yup.array()
    .of(Yup.object({ name: Yup.string(), value: Yup.string() }))
    .min(1, 'At least one technology is required')
    .max(16, 'Max 16 technologies'),
  currency: Yup.string()
    .oneOf(Object.values(Currency), 'Invalid currency')
    .required('Currency is required'),
  contractType: Yup.object({
    name: Yup.string(),
    value: Yup.string(),
  }).required('Contract type is required'),
  employmentType: Yup.object({
    name: Yup.string(),
    value: Yup.string(),
  }).required('Employment type is required'),
  employmentMode: Yup.object({
    name: Yup.string(),
    value: Yup.string(),
  }).required('Employment mode is required'),
  minBudgetForProjectRealisation: Yup.number()
    .min(0, 'The minimum amount must not be less than 0')
    .required('The minimum amount is required'),
  maxBudgetForProjectRealisation: Yup.number()
    .min(
      Yup.ref('minBudgetForProjectRealisation'),
      'The maximum amount must be greater than the minimum',
    )
    .required('The maximum amount is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  remoteOnly: Yup.boolean().oneOf([true, false], 'This field must be checked'),
})

interface CreateJobDetailsFormProps {
  initialValues?: CreateJobDetailsFormValues
}

export const CreateJobDetailsForm = ({ initialValues }: CreateJobDetailsFormProps) => {
  const t = useTranslations(I18nNamespaces.Buttons)
  
  const defaultValues: CreateJobDetailsFormValues = {
    jobName: '',
    projectBrief: '',
    techStack: [],
    currency: Currency.PLN,
    minBudgetForProjectRealisation: null,
    maxBudgetForProjectRealisation: null,
    contractType: { name: '', value: '' },
    employmentType: [],
    employmentMode: [],
    country: '',
    city: '',
    remoteOnly: false,
    terms: false,
    state: PublishingState.DRAFT,
  }

  const handleCreateJobDetails = (values: CreateJobDetailsFormValues) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={initialValues || defaultValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnMount
      onSubmit={handleCreateJobDetails}
    >
      <div className={styles.wrapper}>
        <div className={styles.formBox}>
          <BasicInfo />
          <Budget />
          <Employment />
          <Location />
        </div>
        <div className={styles.actionsWrapper}>
          <Button type="button" variant="secondary">
            {t('deleteJob')}
          </Button>
          <Button type="submit" variant="primary">
            {t('saveAndPreview')}
          </Button>
        </div>
      </div>
    </Formik>
  )
}
