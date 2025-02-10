'use client'

import { ProgressBar } from '@/components/hunter-landing/ProgressBar/ProgressBar'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { Currency, PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import * as Yup from 'yup'
import { JobContractType, type CreateJobDetailsFormValues } from '../../types'
import { BasicInfo } from '../CreateJobDetails/BasicInfo/BasicInfo'
import { Budget } from '../CreateJobDetails/Budget/Budget'
import { Employment } from '../CreateJobDetails/Employment/Employment'
import { Location } from '../CreateJobDetails/Location/Location'
import styles from './CreateJobDetailsForm.module.scss'

interface CreateJobDetailsFormProps {
  initialValues?: CreateJobDetailsFormValues
}

export const CreateJobDetailsForm = ({
  initialValues,
}: CreateJobDetailsFormProps) => {
  const t = useTranslations(I18nNamespaces.Jobs)
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

  const validationSchema = Yup.object().shape({
    jobName: Yup.string().required(
      t('jobNameRequired', { defaultValue: 'Job name is required' }),
    ),
    projectBrief: Yup.string().required(
      t('projectBriefRequired', { defaultValue: 'Project brief is required' }),
    ),
    techStack: Yup.array()
      .of(Yup.object({ name: Yup.string(), value: Yup.string() }))
      .max(16, t('maxTechStack', { defaultValue: 'Max 16 technologies' })),
    currency: Yup.string()
      .oneOf(
        Object.values(Currency),
        t('invalidCurrency', { defaultValue: 'Invalid currency' }),
      )
      .required(
        t('currencyRequired', { defaultValue: 'Currency is required' }),
      ),
    contractType: Yup.object({
      name: Yup.string(),
      value: Yup.string(),
    }).required(
      t('contractTypeRequired', { defaultValue: 'Contract type is required' }),
    ),
    employmentType: Yup.array().min(
      1,
      t('employmentTypeRequired', {
        defaultValue: 'Employment type is required',
      }),
    ),
    employmentMode: Yup.array().min(
      1,
      t('employmentModeRequired', {
        defaultValue: 'Employment mode is required',
      }),
    ),
    minBudgetForProjectRealisation: Yup.number()
      .min(
        0,
        t('minBudgetNonNegative', {
          defaultValue: 'The minimum amount must not be less than 0',
        }),
      )
      .required(
        t('minBudgetRequired', {
          defaultValue: 'The minimum amount is required',
        }),
      ),
    maxBudgetForProjectRealisation: Yup.number()
      .min(
        Yup.ref('minBudgetForProjectRealisation'),
        t('maxBudgetGreaterThanMin', {
          defaultValue: 'The maximum amount must be greater than the minimum',
        }),
      )
      .required(
        t('maxBudgetRequired', {
          defaultValue: 'The maximum amount is required',
        }),
      ),
    country: Yup.string().required(
      t('countryRequired', { defaultValue: 'Country is required' }),
    ),
    city: Yup.string().required(
      t('cityRequired', { defaultValue: 'City is required' }),
    ),
    remoteOnly: Yup.boolean().oneOf([true, false]),
  })

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
