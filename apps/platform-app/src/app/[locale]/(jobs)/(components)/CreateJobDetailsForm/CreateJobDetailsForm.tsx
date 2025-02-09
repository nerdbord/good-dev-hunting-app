'use client'

import { ProgressBar } from '@/components/hunter-landing/ProgressBar/ProgressBar'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { Currency, PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import * as Yup from 'yup'
import {
  JobContractType,
  type CreateJobDetailsFormValues,
} from '../../jobDetailsTypes'
import { BasicInfo } from '../CreateJobDetails/BasicInfo/BasicInfo'
import { Budget } from '../CreateJobDetails/Budget/Budget'
import { Employment } from '../CreateJobDetails/Employment/Employment'
import { Location } from '../CreateJobDetails/Location/Location'
import styles from './CreateJobDetailsForm.module.scss'

const validationSchema = Yup.object().shape({
  jobName: Yup.string().required('Job name is required'),
  projectBrief: Yup.string().required('Project brief is required'),
  techStack: Yup.array()
    .of(Yup.object({ name: Yup.string(), value: Yup.string() }))
    .max(16, 'Max 16 technologies'),
  currency: Yup.string()
    .oneOf(Object.values(Currency), 'Invalid currency')
    .required('Currency is required'),
  contractType: Yup.object({
    name: Yup.string(),
    value: Yup.string(),
  }).required('Contract type is required'),
  employmentType: Yup.array().min(1, 'Employment type is required'),
  employmentMode: Yup.array().min(1, 'Employment mode is required'),
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
  remoteOnly: Yup.boolean().oneOf([true, false]),
})

interface CreateJobDetailsFormProps {
  initialValues?: CreateJobDetailsFormValues
}

export const CreateJobDetailsForm = ({
  initialValues,
}: CreateJobDetailsFormProps) => {
  const tButtons = useTranslations(I18nNamespaces.Buttons)

  const router = useRouter()
  const { id } = useParams()

  const defaultValues: CreateJobDetailsFormValues = {
    jobName: '',
    projectBrief: '',
    techStack: [],
    currency: Currency.PLN,
    minBudgetForProjectRealisation: null,
    maxBudgetForProjectRealisation: null,
    contractType: { name: '', value: JobContractType.B2B },
    employmentType: [],
    employmentMode: [],
    country: '',
    city: '',
    remoteOnly: false,
    terms: true,
    state: PublishingState.DRAFT,
  }

  const handleCreateJobDetails = (values: CreateJobDetailsFormValues) => {
    console.log('submit') //TODO: add save to database logic here
    console.log(values)
    // router.push(`/jobs/${id}`)
  }

  return (
    <Formik
      initialValues={initialValues || defaultValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnMount
      onSubmit={(values, actions) => {
        handleCreateJobDetails(values)
        setTimeout(() => {
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {({ isSubmitting, isValid, handleSubmit }) => (
        <form className={styles.wrapper} onSubmit={handleSubmit}>
          <div className={styles.formBox}>
            <BasicInfo />
            <Budget />
            <Employment />
            <Location />
          </div>
          <ProgressBar currentStep={2} maxSteps={3}>
            <Button variant="secondary" disabled={false}>
              {tButtons('goBack')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {tButtons('saveAndPreview')}
            </Button>
          </ProgressBar>
        </form>
      )}
    </Formik>
  )
}
