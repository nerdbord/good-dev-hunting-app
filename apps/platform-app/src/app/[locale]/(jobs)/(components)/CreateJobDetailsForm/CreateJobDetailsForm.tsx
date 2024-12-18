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

const initialValues: CreateJobDetailsFormValues = {
  jobName: '',
  projectBrief: '',
  techStack: [],
  currency: Currency.PLN,
  minBudgetForProjectRealisation: null,
  maxBudgetForProjectRealisation: null,
  contractType: [],
  employmentType: [],
  employmentMode: [],
  country: '',
  city: '',
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
    .oneOf(Object.values(Currency), 'Nieprawidłowa waluta')
    .required('Waluta jest wymagana'),
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
    .min(0, 'Minimalna kwota nie może być mniejsza niż 0')
    .required('Minimalna kwota jest wymagana'),
  maxBudgetForProjectRealisation: Yup.number()
    .min(
      Yup.ref('minBudgetForProjectRealisation'),
      'Maksymalna kwota musi być większa niż minimalna',
    )
    .required('Maksymalna kwota jest wymagana'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
})

export const CreateJobDetailsForm = () => {
  const handleCreateJobDetails = (values: CreateJobDetailsFormValues) => {
    console.log(values)
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnMount
      onSubmit={handleCreateJobDetails}
    >
      <div className={styles.wrapper}>
        <Button type="submit" variant="primary">
          Publikuj ofertę
        </Button>
        <div className={styles.formBox}>
          <BasicInfo />
          <Budget />
          <Employment />
          <Location />
        </div>
        <div className={styles.actionsWrapper}>
          <Button type="button" variant="primary">
            Usuń ofertę
          </Button>
          <Button type="submit" variant="primary">
            Edytuj ofertę
          </Button>
          <Button type="submit" variant="primary">
            Zapisz ofertę
          </Button>
        </div>
      </div>
    </Formik>
  )
}
