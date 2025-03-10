'use client'

import { FormNavigationWarning } from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/FormStateMonitor/FormStateMonitor'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { Currency, PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import * as Yup from 'yup'
import {
  BudgetType,
  JobContractType,
  type CreateJobFormValues,
} from '../../_utils/types'
import styles from './CreateJobForm.module.scss'
import { BasicInfo } from './CreateJobFormDetails/BasicInfo/BasicInfo'
import { Budget } from './CreateJobFormDetails/Budget/Budget'
import { Employment } from './CreateJobFormDetails/Employment/Employment'
import { Location } from './CreateJobFormDetails/Location/Location'

interface CreateJobFormProps {
  initialValues?: CreateJobFormValues
}

export const CreateJobForm = ({ initialValues }: CreateJobFormProps) => {
  const t = useTranslations(I18nNamespaces.Jobs)
  const tButtons = useTranslations(I18nNamespaces.Buttons)

  const router = useRouter()
  const { id: jobId } = useParams()

  const defaultValues: CreateJobFormValues = {
    jobName: '',
    projectBrief: '',
    techStack: [],
    budgetType: BudgetType.FIXED,
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
    // New field for budget type selection
    budgetType: Yup.string()
      .oneOf(['fixed', 'requestQuote'])
      .required(
        t('budgetTypeRequired', { defaultValue: 'Please select budget type' }),
      ),
    // Conditional validation for budget-related fields
    currency: Yup.string().when('budgetType', {
      is: 'fixed',
      then: () =>
        Yup.string()
          .oneOf(
            Object.values(Currency),
            t('invalidCurrency', { defaultValue: 'Invalid currency' }),
          )
          .required(
            t('currencyRequired', { defaultValue: 'Currency is required' }),
          ),
      otherwise: () => Yup.string().notRequired(),
    }),
    minBudgetForProjectRealisation: Yup.number().when('budgetType', {
      is: 'fixed',
      then: () =>
        Yup.number()
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
      otherwise: () => Yup.number().notRequired(),
    }),
    maxBudgetForProjectRealisation: Yup.number().when('budgetType', {
      is: 'fixed',
      then: () =>
        Yup.number()
          .min(
            1,
            t('maxBudgetGreaterThan0', {
              defaultValue: 'The maximum amount must be greater than 0',
            }),
          )
          .test(
            'greater-than-min',
            t('maxBudgetGreaterThanMin', {
              defaultValue:
                'The maximum amount must be greater than the minimum',
            }),
            function (value) {
              return value
                ? value > this.parent.minBudgetForProjectRealisation
                : false
            },
          )
          .required(
            t('maxBudgetRequired', {
              defaultValue: 'The maximum amount is required',
            }),
          ),
      otherwise: () => Yup.number().notRequired(),
    }),
    country: Yup.string().required(
      t('countryRequired', { defaultValue: 'Country is required' }),
    ),
    city: Yup.string().required(
      t('cityRequired', { defaultValue: 'City is required' }),
    ),
    remoteOnly: Yup.boolean().oneOf([true, false]),
  })

  const handleCreateJobDetails = (values: CreateJobFormValues) => {
    console.log('submit') //TODO: add save to database logic here
    console.log(values)
    // router.push(`/jobs/${id}`)
  }

  if (typeof jobId !== 'string' || !jobId) {
    return <p>Something went wrong. Please try again.</p>
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
        router.push(AppRoutes.job.replace(':id', jobId))
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
            <Button
              variant="secondary"
              disabled={false}
              onClick={() => router.back()}
            >
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
          <FormNavigationWarning />
        </form>
      )}
    </Formik>
  )
}
