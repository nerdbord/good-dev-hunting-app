import { Currency, PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { type CreateJobDetailsFormValues } from '../../jobDetailsTypes'

const initialValues: CreateJobDetailsFormValues = {
  jobName: '',
  projectBrief: '',
  techStack: [],
  currency: Currency.PLN,
  minBudgetForProjectRealisation: 0,
  maxBudgetForProjectRealisation: 0,
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
    .oneOf(Object.keys(Currency), `Invalid currency`)
    .required('Currency is required.'),
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
  minBudgetForProjectRealisation: Yup.number().required(
    'Min budget for project realisation is required',
  ),
  maxBudgetForProjectRealisation: Yup.number().required(
    'Max budget for project realisation is required',
  ),
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
      <div>CreateJobDetailsForm</div>
    </Formik>
  )
}
